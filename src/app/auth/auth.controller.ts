import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { AuthService } from '@app/auth/auth.service';
import { LoginRequest } from '@app/auth/dtos/login.request';
import { TokenResponse } from '@app/auth/dtos/token.response';
import { JwtAuthGuard } from '@app/auth/guards/jwt.guard';
import { UserProfileResponse } from '@app/user/dtos/user-profile.response';
import { Request } from '@infrastructure/types/request.types';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: '액세스 토큰을 발급합니다.' })
  async login(
    @Body() data: LoginRequest,
    @Res({ passthrough: true }) res: Response,
  ): Promise<TokenResponse> {
    return this.authService.login(data, res);
  }

  @Patch('refresh')
  @ApiOperation({ summary: '액세스 토큰을 갱신합니다.' })
  async refresh(@Req() req: Request): Promise<TokenResponse> {
    return this.authService.refresh(req);
  }

  @Delete('logout')
  @ApiOperation({ summary: '토큰을 만료 처리합니다.' })
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<boolean> {
    return this.authService.logout(req, res);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '프로필 정보를 조회합니다.' })
  @ApiBearerAuth()
  async getMyProfile(@Req() { user }: Request): Promise<UserProfileResponse> {
    return this.authService.getMyProfile(user);
  }
}
