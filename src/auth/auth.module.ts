import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from 'src/users/models/user.schema';

import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { Token, TokenSchema } from './models/token.schema';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: Token.name, schema: TokenSchema },
      { name: User.name, schema: UserSchema }
    ]),
    JwtModule.register({ global: true })
  ],
  providers: [ConfigService, AuthService, AuthResolver, AccessTokenStrategy, RefreshTokenStrategy]
})
export class AuthModule {}
