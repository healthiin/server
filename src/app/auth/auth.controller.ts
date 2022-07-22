import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { AuthService } from '@app/auth/auth.service';
import { LoginRequest } from '@app/auth/dtos/login.request';
import { TokenResponse } from '@app/auth/dtos/token.response';
import { JwtAuthGuard } from '@app/auth/guards/jwt.guard';
import { UserProfileResponse } from '@app/user/dtos/user-profile.response';
import { Request } from '@infrastructure/types/request.types';

@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '회원 로그인' })
  @Post('login')
  async login(
    @Body() data: LoginRequest,
    @Res({ passthrough: true }) res: Response,
  ): Promise<TokenResponse> {
    return this.authService.login(data, res);
  }

  @ApiOperation({ summary: '회원 로그아웃' })
  @Delete('logout')
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<boolean> {
    return this.authService.logout(req, res);
  }

  @ApiOperation({ summary: '토큰 값 갱신' })
  @Get('refresh')
  async refresh(@Req() req: Request): Promise<TokenResponse> {
    return this.authService.refresh(req);
  }

  @ApiOperation({ summary: '본인 상세 정보 획득' })
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getMyProfile(@Req() { user }: Request): Promise<UserProfileResponse> {
    return this.authService.getMyProfile(user);
  }
}
