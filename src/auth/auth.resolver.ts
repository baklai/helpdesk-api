import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Request, Response } from 'express';

import { JwtProfile } from 'src/common/decorators/user-jwt.decorator';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { RefreshTokenGuard } from 'src/common/guards/refresh-token.guard';
import type { JwtPayload } from 'src/common/types/jwt-payload.type';
import type { TokensType } from 'src/common/types/tokens.type';
import { UserEntity } from 'src/users/entities/user.entity';

import { AuthService } from './auth.service';
import { SigninAuthInput } from './dto/signin-auth.input';
import { SignupAuthInput } from './dto/signup-auth.input';

@Resolver('Авторизація')
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {}

  private storeRefreshTokenInCookie(res: Response, refreshToken: string) {
    const expiresIn = this.configService.getOrThrow<string>('JWT_REFRESH_EXPIRES_IN');
    const msPerDay = 24 * 60 * 60 * 1000;
    const days = expiresIn.endsWith('d') ? parseInt(expiresIn, 10) : 7;
    const maxAge = days * msPerDay;

    res.cookie('token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge
    });
  }

  private clearRefreshTokenCookie(res: Response) {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
  }

  @Query(() => UserEntity, {
    name: 'me',
    description: 'Отримання інформації про поточного користувача'
  })
  @UseGuards(AccessTokenGuard)
  async me(@JwtProfile() user: JwtPayload): Promise<UserEntity> {
    return await this.authService.me(user.id);
  }

  @Mutation(() => String, {
    name: 'signin',
    description: 'Автентифікація користувача та отримання токена'
  })
  async signin(
    @Args('input') input: SigninAuthInput,
    @Context() context: { req: Request; res: Response }
  ): Promise<string> {
    const { accessToken, refreshToken }: TokensType = await this.authService.signin(input);
    this.storeRefreshTokenInCookie(context.res, refreshToken);
    return accessToken;
  }

  @Mutation(() => UserEntity, {
    name: 'signup',
    description: 'Реєстрація нового користувача'
  })
  async signup(@Args('input') input: SignupAuthInput): Promise<UserEntity> {
    return await this.authService.signup(input);
  }

  @Mutation(() => Boolean, { name: 'signout', description: 'Завершення сеансу (вихід)' })
  @UseGuards(AccessTokenGuard)
  async signout(
    @JwtProfile() user: JwtPayload,
    @Context() context: { req: Request; res: Response }
  ): Promise<boolean> {
    const userId = user.id;
    const result = await this.authService.signout(userId);
    this.clearRefreshTokenCookie(context.res);
    return result;
  }

  @Mutation(() => String, { name: 'refresh', description: 'Оновлення токена доступу' })
  @UseGuards(RefreshTokenGuard)
  async refresh(@Context() context: { req: Request; res: Response }): Promise<string> {
    const refreshToken = context.req.cookies['token'] as string;
    if (!refreshToken) {
      throw new UnauthorizedException('Токен оновлення відсутній');
    }
    const payload = context.req.user as JwtPayload;
    const tokens: TokensType = await this.authService.refresh(payload.id, refreshToken);
    this.storeRefreshTokenInCookie(context.res, tokens.refreshToken);
    return tokens.accessToken;
  }
}
