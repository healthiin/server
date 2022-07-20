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
import { Response } from 'express';

import { AuthService } from '@app/auth/auth.service';
import { LoginRequest } from '@app/auth/dtos/login.request';
import { TokenResponse } from '@app/auth/dtos/token.response';
import { JwtAuthGuard } from '@app/auth/guards/jwt.guard';
import { UserProfileResponse } from '@app/user/dtos/user-profile.response';
import { Request } from '@infrastructure/types/request.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() data: LoginRequest,
    @Res({ passthrough: true }) res: Response,
  ): Promise<TokenResponse> {
    return this.authService.login(data, res);
  }

  @Delete('logout')
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<boolean> {
    return this.authService.logout(req, res);
  }

  @Get('refresh')
  async refresh(@Req() req: Request): Promise<TokenResponse> {
    return this.authService.refresh(req);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getMyProfile(@Req() { user }: Request): Promise<UserProfileResponse> {
    return this.authService.getMyProfile(user);
  }
}
