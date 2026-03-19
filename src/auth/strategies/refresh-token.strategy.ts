import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';

import { JwtPayload } from 'src/common/types/jwt-payload.type';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: (req: Request) => req?.cookies?.['token'] || null,
      secretOrKey: configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
      passReqToCallback: true
    });
  }

  async validate(req: Request, payload: JwtPayload) {
    const refreshToken = req.cookies?.['token'];

    if (!refreshToken) {
      throw new UnauthorizedException('Токен оновлення відсутній');
    }

    return {
      id: payload.id,
      email: payload.email,
      token: refreshToken
    };
  }
}
