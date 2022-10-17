import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthenticationService } from '@app/auth/authentication/authentication.service';
import { LoginRequest } from '@app/auth/authentication/dtos/login.request';
import { TokenResponse } from '@app/auth/authentication/dtos/token.response';
import { JwtAuthGuard } from '@app/auth/authentication/jwt.guard';
import { UserProfileResponse } from '@app/user/dtos/user-profile.response';
import { Request } from '@infrastructure/types/request.types';

@Controller('auth')
@ApiTags('[계정] 인증')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('login')
  @ApiOperation({ summary: '액세스 토큰을 발급합니다.' })
  async login(
    @Body() data: LoginRequest,
    @Res({ passthrough: true }) res,
  ): Promise<TokenResponse> {
    return this.authenticationService.login(data, res);
  }

  @Post('login/:userId')
  @ApiOperation({ summary: '액세스 토큰을 발급합니다.' })
  async loginByUserId(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Res({ passthrough: true }) res,
  ): Promise<TokenResponse> {
    return this.authenticationService.loginByUserId(userId, res);
  }

  @Patch('refresh')
  @ApiOperation({ summary: '액세스 토큰을 갱신합니다.' })
  async refresh(@Req() req: Request): Promise<TokenResponse> {
    return this.authenticationService.refresh(req);
  }

  @Delete('logout')
  @ApiOperation({ summary: '토큰을 만료 처리합니다.' })
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res,
  ): Promise<boolean> {
    return this.authenticationService.logout(req, res);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '프로필 정보를 조회합니다.' })
  @ApiBearerAuth()
  async getMyProfile(@Req() { user }: Request): Promise<UserProfileResponse> {
    return this.authenticationService.getMyProfile(user);
  }
}
