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

import { generatePassword } from 'src/common/utils/lib.util';
import { ProfilesService } from 'src/profiles/profiles.service';
import { MailerService } from 'src/mailer/mailer.service';
import { Scope } from 'src/common/enums/scope.enum';
import { Profile } from 'src/profiles/schemas/profile.schema';

import { RefreshToken } from './schemas/refreshToken.schema';
import { SigninAuthDto } from './dto/signin-auth.dto';
import { SignupAuthDto } from './dto/signup-auth.dto';
import { ResetAuthDto } from './dto/reset-auth.dto';
import { TokensDto } from './dto/tokens.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Profile.name) private readonly profileModel: Model<Profile>,
    @InjectModel(RefreshToken.name) private readonly refreshTokenModel: Model<RefreshToken>,
    private readonly profilesService: ProfilesService,
    private readonly mailerService: MailerService,
    private configService: ConfigService,
    private jwtService: JwtService
  ) {}

  async me(id: string): Promise<Profile> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid profile ID');
    }

    const profile = await this.profileModel.findById(id).exec();

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return profile;
  }

  async signin({ email, password }: SigninAuthDto): Promise<TokensDto> {
    const profile = await this.profileModel.findOne({ email }, '+password').exec();

    if (!profile) {
      throw new BadRequestException('Profile does not exist');
    }

    if (!profile?.isActivated) {
      throw new UnauthorizedException('Profile account is disabled');
    }

    const passwordMatches = await bcrypt.compare(password, profile.password);

    if (!passwordMatches) {
      throw new BadRequestException('The password is incorrect');
    }

    const tokens = await this.generateTokens(
      profile.id,
      profile.email,
      profile.fullname,
      profile.isActivated,
      profile.isAdmin,
      profile.scope
    );

    await this.updateRefreshToken(profile.id, tokens.refreshToken);

    return tokens;
  }

  async signup(signupAuthDto: SignupAuthDto): Promise<Profile> {
    const profileExists = await this.profileModel.findOne({ email: signupAuthDto.email }).exec();

    if (profileExists) {
      throw new ConflictException('Profile already exists');
    }

    const password = generatePassword(8, {
      numbers: true,
      symbols: false,
      uppercase: true,
      excludeSimilarCharacters: true
    });

    const passwordHash = await bcrypt.hash(
      password,
      Number(this.configService.get<number>('BCRYPT_SALT'))
    );

    try {
      const profile = await this.profileModel.create({
        ...signupAuthDto,
        password: passwordHash,
        isActivated: false,
        isAdmin: false,
        scope: []
      });

      this.mailerService.sendProfile(profile.email, {
        email: profile.email,
        password: password,
        fullname: profile.fullname
      });

      const admins = await this.profilesService.findEmailsIsAdmin();

      this.mailerService.sendProfileNotice(admins, {
        email: profile.email,
        phone: profile.phone,
        fullname: profile.fullname
      });

      return await this.profileModel.findById(profile.id).exec();
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  async reset(resetAuthDto: ResetAuthDto): Promise<Profile> {
    const profile = await this.profileModel.findOne({ email: resetAuthDto.email }).exec();

    if (!profile) {
      throw new BadRequestException('Profile does not exist');
    }

    if (!profile?.isActivated) {
      throw new UnauthorizedException('Profile account is disabled');
    }

    const password = generatePassword(8, {
      numbers: true,
      symbols: false,
      uppercase: true,
      excludeSimilarCharacters: true
    });

    const passwordHash = await bcrypt.hash(
      password,
      Number(this.configService.get<number>('BCRYPT_SALT'))
    );

    try {
      const updatedProfile = await this.profileModel
        .findByIdAndUpdate(profile.id, { $set: { password: passwordHash } }, { new: false })
        .exec();

      this.mailerService.sendResetPassword(profile.email, {
        email: profile.email,
        password: password,
        fullname: profile.fullname
      });

      return updatedProfile;
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  async signout(profile: string) {
    await this.refreshTokenModel.findOneAndDelete({ profile });
    return;
  }

  async refresh(id: string, refreshToken: string) {
    const profile = await this.profileModel.findById(id).exec();

    const rtStore = await this.refreshTokenModel.findOne({ profile: id });

    if (!profile || !profile?.isActivated || !rtStore?.refreshToken) {
      throw new UnauthorizedException();
    }

    const refreshTokenMatches = await bcrypt.compare(refreshToken, rtStore.refreshToken);
    if (!refreshTokenMatches) {
      throw new UnauthorizedException();
    }

    const tokens = await this.generateTokens(
      profile.id,
      profile.email,
      profile.fullname,
      profile.isActivated,
      profile.isAdmin,
      profile.scope
    );

    await this.updateRefreshToken(profile.id, tokens.refreshToken);

    return tokens;
  }

  async generateTokens(
    id: string,
    email: string,
    fullname: string,
    isActivated: boolean,
    isAdmin: boolean,
    scope: Scope
  ) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { id, email, fullname, isActivated, isAdmin, scope },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRES_IN')
        }
      ),
      this.jwtService.signAsync(
        { id, email },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN')
        }
      )
    ]);

    return { accessToken, refreshToken };
  }

  async updateRefreshToken(profileId: string, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(
      refreshToken,
      Number(this.configService.get<number>('BCRYPT_SALT'))
    );

    await this.refreshTokenModel
      .findOneAndUpdate(
        { profile: profileId },
        { profile: profileId, refreshToken: hashedRefreshToken },
        { new: true, upsert: true }
      )
      .exec();
  }
}
