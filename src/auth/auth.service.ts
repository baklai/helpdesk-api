import {
  UnprocessableEntityException,
  UnauthorizedException,
  BadRequestException,
  ConflictException,
  NotFoundException,
  Injectable
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User } from 'src/users/schemas/user.schema';
import { RefreshToken } from './schemas/refreshToken.schema';

import { TokensDto } from './dto/tokens.dto';
import { SigninAuthDto } from './dto/signin-auth.dto';
import { SignupAuthDto } from './dto/signup-auth.dto';
import { Scope } from 'src/common/enums/scope.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(RefreshToken.name) private readonly refreshTokenModel: Model<RefreshToken>,
    private configService: ConfigService,
    private jwtService: JwtService
  ) {}

  async me(id: string): Promise<User> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid user ID');
    }
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async signin({ login, password }: SigninAuthDto): Promise<TokensDto> {
    const user = await this.userModel.findOne({ login }, '+password').exec();

    if (!user) {
      throw new BadRequestException('User does not exist');
    }
    if (!user?.isActive) {
      throw new UnauthorizedException('User account is disabled');
    }
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      throw new BadRequestException('The password is incorrect');
    }

    const tokens = await this.generateTokens(
      user.id,
      user.login,
      user.isActive,
      user.isAdmin,
      user.scope
    );
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async signup(signupAuthDto: SignupAuthDto): Promise<User> {
    const userExists = await this.userModel.findOne({ login: signupAuthDto.login }).exec();
    if (userExists) {
      throw new ConflictException('User already exists');
    }
    const passwordHash = await bcrypt.hash(
      signupAuthDto.password,
      this.configService.get('bcryptSalt')
    );

    try {
      const user = await this.userModel.create({
        ...signupAuthDto,
        password: passwordHash,
        isActive: false,
        isAdmin: false,
        scope: []
      });
      return await this.userModel.findById(user.id).exec();
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  async signout(userId: string) {
    await this.refreshTokenModel.findOneAndDelete({ userId });
    return;
  }

  async refresh(userId: string, refreshToken: string) {
    const user = await this.userModel.findById(userId).exec();
    const rtStore = await this.refreshTokenModel.findOne({ userId });
    if (!user || !user?.isActive || !rtStore?.refreshToken) {
      throw new UnauthorizedException();
    }
    const refreshTokenMatches = await bcrypt.compare(refreshToken, rtStore.refreshToken);
    if (!refreshTokenMatches) {
      throw new UnauthorizedException();
    }
    const tokens = await this.generateTokens(
      user.id,
      user.login,
      user.isActive,
      user.isAdmin,
      user.scope
    );
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async generateTokens(
    id: string,
    login: string,
    isActive: boolean,
    isAdmin: boolean,
    scope: Scope
  ) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { id, login, isActive, isAdmin, scope },
        {
          secret: this.configService.get('jwtAccessSecret'),
          expiresIn: this.configService.get('jwtAccessExpiresIn')
        }
      ),
      this.jwtService.signAsync(
        { id, login },
        {
          secret: this.configService.get('jwtRefreshSecret'),
          expiresIn: this.configService.get('jwtRefreshExpiresIn')
        }
      )
    ]);

    return { accessToken, refreshToken };
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(
      refreshToken,
      this.configService.get('bcryptSalt')
    );
    await this.refreshTokenModel
      .findOneAndUpdate(
        { userId },
        { userId, refreshToken: hashedRefreshToken },
        { new: true, upsert: true }
      )
      .exec();
  }
}
