import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { UserCreateRequest } from '@app/user/dtos/user-create.request';
import { UserProfileUpdateRequest } from '@app/user/dtos/user-profile-update.request';
import { UserProfileResponse } from '@app/user/dtos/user-profile.response';
import { UserService } from '@app/user/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    @Body() data: UserCreateRequest,
  ): Promise<UserProfileResponse> {
    return this.userService.createUser(data);
  }

  @Get('get-users-profile/:id')
  async getUserProfile(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<UserProfileResponse> {
    return this.userService.getUserProfile(id);
  }

  @Delete('withdraw-users/:id')
  async withdrawUser(@Param('id', ParseUUIDPipe) id: string): Promise<boolean> {
    return this.userService.withdrawUser(id);
  }

  @Patch('update-users-profile/:id')
  async updateUserProfile(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UserProfileUpdateRequest,
  ): Promise<UserProfileResponse> {
    return this.userService.updateUserProfile(id, data);
  }

  @Patch('update-users-password/:id')
  async updateUserPassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: { password: string },
  ): Promise<boolean> {
    return this.userService.updateUserPassword(id, data.password);
  }
}
