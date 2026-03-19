import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { JwtSignOptions } from '@nestjs/jwt';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import bcrypt from 'bcrypt';
import { Model, Types } from 'mongoose';

import { UserRole } from 'src/common/enums/user-role.enum';
import { UserStatus } from 'src/common/enums/user-status.enum';
import type { TokensType } from 'src/common/types/tokens.type';
import { UserEntity } from 'src/users/entities/user.entity';
import { User, UserDocument } from 'src/users/models/user.schema';

import { SigninAuthInput } from './dto/signin-auth.input';
import { SignupAuthInput } from './dto/signup-auth.input';
import { Token, TokenDocument } from './models/token.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Token.name) private readonly tokenModel: Model<TokenDocument>,
    private configService: ConfigService,
    private jwtService: JwtService
  ) {}

  private async generateTokens(
    id: string,
    email: string,
    fullname: string,
    status: UserStatus,
    role: UserRole,
    scope: string
  ): Promise<TokensType> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { id, email, fullname, status, role, scope },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: this.configService.get<string>(
            'JWT_ACCESS_EXPIRES_IN'
          ) as JwtSignOptions['expiresIn']
        }
      ),
      this.jwtService.signAsync(
        { id, email },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: this.configService.get<string>(
            'JWT_REFRESH_EXPIRES_IN'
          ) as JwtSignOptions['expiresIn']
        }
      )
    ]);

    return { accessToken, refreshToken };
  }

  private async updateToken(userId: string, refreshToken: string) {
    const hashedToken = await bcrypt.hash(
      refreshToken,
      Number(this.configService.get<number>('BCRYPT_SALT'))
    );

    await this.tokenModel
      .findOneAndUpdate(
        { user: userId },
        { user: userId, value: hashedToken },
        { returnDocument: 'after', upsert: true }
      )
      .exec();
  }

  async me(id: string): Promise<UserEntity> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Недійсний ідентифікатор користувача');
    }

    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new NotFoundException('Користувача не знайдено');
    }

    return user;
  }

  async signin({ email, password }: SigninAuthInput): Promise<TokensType> {
    const user = await this.userModel.findOne({ email }, '+password').exec();

    if (!user) {
      throw new UnauthorizedException('Невірна електронна пошта або пароль');
    }

    const statusActions: Partial<Record<UserStatus, string>> = {
      [UserStatus.PENDING]: 'Обліковий запис ще не активовано',
      [UserStatus.DISABLED]: 'Обліковий запис вимкнено',
      [UserStatus.BLOCKED]: 'Обліковий запис заблоковано'
    };

    const statusMessage = statusActions[user.status];
    if (statusMessage) {
      throw new UnauthorizedException(statusMessage);
    }

    if (user.status !== UserStatus.ACTIVE) {
      throw new UnauthorizedException('Доступ заборонено');
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      throw new BadRequestException('Невірна електронна пошта або пароль');
    }

    const { accessToken, refreshToken } = await this.generateTokens(
      user.id,
      user.email,
      user.fullname,
      user.status,
      user.role,
      user.scope
    );

    await this.updateToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  }

  async signup(input: SignupAuthInput): Promise<UserEntity> {
    const userExists = await this.userModel.findOne({ email: input.email }).exec();

    if (userExists) {
      throw new ConflictException('Користувач із такою електронною поштою вже існує');
    }

    const passwordHash = await bcrypt.hash(
      input.password,
      Number(this.configService.get<number>('BCRYPT_SALT'))
    );

    try {
      const user = await this.userModel.create({
        ...input,
        password: passwordHash,
        status: UserStatus.PENDING,
        role: UserRole.CLIENT,
        scope: '0'
      });

      if (!user) {
        throw new BadRequestException('Не вдалося створити користувача');
      }

      return user;
    } catch {
      throw new UnprocessableEntityException('Помилка при обробці даних користувача');
    }
  }

  async signout(user: string): Promise<boolean> {
    if (!Types.ObjectId.isValid(user)) {
      throw new BadRequestException('Недійсний ідентифікатор користувача');
    }

    await this.tokenModel.findOneAndDelete({ user });

    return true;
  }

  async refresh(id: string, refreshToken: string): Promise<TokensType> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Недійсний ідентифікатор користувача');
    }

    if (!refreshToken) {
      throw new UnauthorizedException('Токен оновлення відсутній');
    }

    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new UnauthorizedException('Користувача не знайдено');
    }

    const statusActions: Partial<Record<UserStatus, string>> = {
      [UserStatus.PENDING]: 'Обліковий запис ще не активовано',
      [UserStatus.DISABLED]: 'Обліковий запис вимкнено',
      [UserStatus.BLOCKED]: 'Обліковий запис заблоковано'
    };

    const statusMessage = statusActions[user.status];
    if (statusMessage) {
      throw new UnauthorizedException(statusMessage);
    }

    if (user.status !== UserStatus.ACTIVE) {
      throw new UnauthorizedException('Доступ заборонено');
    }

    const rtStore = await this.tokenModel.findOne({ user: id });

    if (!rtStore?.value) {
      throw new UnauthorizedException('Сесія застаріла або недійсна. Будь ласка, увійдіть знову');
    }

    const refreshTokenMatches = await bcrypt.compare(refreshToken, rtStore.value);

    if (!refreshTokenMatches) {
      throw new UnauthorizedException(
        'Некоректний токен сесії. Будь ласка, авторизуйтесь повторно'
      );
    }

    const tokens = await this.generateTokens(
      user.id,
      user.email,
      user.fullname,
      user.status,
      user.role,
      user.scope
    );

    await this.updateToken(user.id, tokens.refreshToken);

    return tokens;
  }
}
