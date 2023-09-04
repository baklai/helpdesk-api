import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Request, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiOkResponse,
  ApiBearerAuth,
  ApiTags,
  ApiOperation
} from '@nestjs/swagger';

import { User } from 'src/users/schemas/user.schema';
import { UserDto } from 'src/users/dto/user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';
import { RolesGuard } from 'src/common/guards/scopes.guard';

import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { TokensDto } from './dto/tokens.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('me')
  @ApiBearerAuth('JWT Guard')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @ApiOperation({ summary: 'Retrieve user information' })
  @ApiOkResponse({ description: 'Success', type: UserDto })
  me(@Request() req: Record<string, any>): Promise<User> {
    return this.authService.me(req.user.id);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Authenticate user and generate access tokens' })
  @ApiOkResponse({ description: 'User authenticated successfully', type: TokensDto })
  signin(@Body() authDto: AuthDto): Promise<TokensDto> {
    return this.authService.signin(authDto);
  }

  @Post('signup')
  @ApiOperation({ summary: 'Create a new user account' })
  @ApiConflictResponse({ description: 'A login with the same name already exists' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiOkResponse({ description: 'Success', type: UserDto })
  signup(@Body() authDto: CreateUserDto): Promise<User> {
    return this.authService.signup(authDto);
  }

  @Get('refresh')
  @ApiBearerAuth('JWT Guard')
  @UseGuards(RefreshTokenGuard)
  @ApiOperation({ summary: 'Refresh access tokens using a valid refresh token' })
  @ApiOkResponse({ description: 'Success', type: TokensDto })
  refresh(@Req() req: Record<string, any>): Promise<TokensDto> {
    const userId = req.user['id'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refresh(userId, refreshToken);
  }

  @Get('signout')
  @ApiBearerAuth('JWT Guard')
  @UseGuards(AccessTokenGuard)
  @ApiOperation({ summary: 'Sign out and invalidate the access token' })
  signout(@Req() req: Record<string, any>) {
    return this.authService.signout(req.user['id']);
  }
}
