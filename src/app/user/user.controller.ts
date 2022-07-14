import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';

import { UserCreateRequest } from '@app/user/dtos/user-create.request';
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

  @Get(':username')
  async getUserProfile(
    @Param('username') username: string,
  ): Promise<UserProfileResponse> {
    return this.userService.getUserProfile(username);
  }

  @Delete(':id')
  async withdrawUser(@Param('id', ParseUUIDPipe) id: string): Promise<boolean> {
    return this.userService.withdrawUser(id);
  }
}
