import {
  Controller,
  HttpStatus,
  UseGuards,
  HttpCode,
  Request,
  Body,
  Post,
  Get,
  Req
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiOkResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';

import { User } from 'src/users/schemas/user.schema';
import { UserDto } from 'src/users/dto/user.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';
import { ScopesGuard } from 'src/common/guards/scopes.guard';

import { TokensDto } from './dto/tokens.dto';
import { SigninAuthDto } from './dto/signin-auth.dto';
import { SignupAuthDto } from './dto/signup-auth.dto';

import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('me')
  @ApiBearerAuth('JWT Guard')
  @UseGuards(AccessTokenGuard, ScopesGuard)
  @ApiOperation({ summary: 'Retrieve user information' })
  @ApiOkResponse({ description: 'Success', type: UserDto })
  async me(@Request() req: Record<string, any>): Promise<User> {
    return await this.authService.me(req.user.id);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Authenticate user and generate access tokens' })
  @ApiOkResponse({ description: 'User authenticated successfully', type: TokensDto })
  async signin(@Body() signinAuthDto: SigninAuthDto): Promise<TokensDto> {
    return await this.authService.signin(signinAuthDto);
  }

  @Post('signup')
  @ApiOperation({ summary: 'Create a new user account' })
  @ApiConflictResponse({ description: 'A login with the same name already exists' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiOkResponse({ description: 'Success', type: UserDto })
  async signup(@Body() signupAuthDto: SignupAuthDto): Promise<User> {
    return await this.authService.signup(signupAuthDto);
  }

  @Get('refresh')
  @ApiBearerAuth('JWT Guard')
  @UseGuards(RefreshTokenGuard)
  @ApiOperation({ summary: 'Refresh access tokens using a valid refresh token' })
  @ApiOkResponse({ description: 'Success', type: TokensDto })
  async refresh(@Req() req: Record<string, any>): Promise<TokensDto> {
    const userId = req.user['id'];
    const refreshToken = req.user['refreshToken'];
    return await this.authService.refresh(userId, refreshToken);
  }

  @Get('signout')
  @ApiBearerAuth('JWT Guard')
  @UseGuards(AccessTokenGuard)
  @ApiOperation({ summary: 'Sign out and invalidate the access token' })
  async signout(@Req() req: Record<string, any>) {
    return await this.authService.signout(req.user['id']);
  }
}
