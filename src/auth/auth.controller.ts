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

import { Profile } from 'src/profiles/schemas/profile.schema';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';
import { ScopesGuard } from 'src/common/guards/scopes.guard';

import { AuthService } from './auth.service';
import { TokensDto } from './dto/tokens.dto';
import { ResetAuthDto } from './dto/reset-auth.dto';
import { SigninAuthDto } from './dto/signin-auth.dto';
import { SignupAuthDto } from './dto/signup-auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('me')
  @ApiBearerAuth('JWT Guard')
  @UseGuards(AccessTokenGuard, ScopesGuard)
  @ApiOperation({ summary: 'Retrieve profile information' })
  @ApiOkResponse({ description: 'Success', type: Profile })
  async me(@Request() req: Record<string, any>): Promise<Profile> {
    return await this.authService.me(req.user.id);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Authenticate profile and generate access tokens' })
  @ApiOkResponse({ description: 'Profile authenticated successfully', type: TokensDto })
  async signin(@Body() signinAuthDto: SigninAuthDto): Promise<TokensDto> {
    return await this.authService.signin(signinAuthDto);
  }

  @Post('signup')
  @ApiOperation({ summary: 'Create a new profile account' })
  @ApiConflictResponse({ description: 'A email with the same name already exists' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiOkResponse({ description: 'Success', type: Profile })
  async signup(@Body() signupAuthDto: SignupAuthDto): Promise<Profile> {
    return await this.authService.signup(signupAuthDto);
  }

  @Post('reset')
  @ApiOperation({ summary: 'Reset password a profile account' })
  @ApiConflictResponse({ description: 'A email with the same name already exists' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiOkResponse({ description: 'Success', type: Profile })
  async reset(@Body() resetAuthDto: ResetAuthDto): Promise<Profile> {
    return await this.authService.reset(resetAuthDto);
  }

  @Get('refresh')
  @ApiBearerAuth('JWT Guard')
  @UseGuards(RefreshTokenGuard)
  @ApiOperation({ summary: 'Refresh access tokens using a valid refresh token' })
  @ApiOkResponse({ description: 'Success', type: TokensDto })
  async refresh(@Req() req: Record<string, any>): Promise<TokensDto> {
    const profileId = req.user['id'];
    const refreshToken = req.user['refreshToken'];
    return await this.authService.refresh(profileId, refreshToken);
  }

  @Get('signout')
  @ApiBearerAuth('JWT Guard')
  @UseGuards(AccessTokenGuard)
  @ApiOperation({ summary: 'Sign out and invalidate the access token' })
  async signout(@Req() req: Record<string, any>) {
    return await this.authService.signout(req.user['id']);
  }
}
