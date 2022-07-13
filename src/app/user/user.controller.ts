import { Body, Controller, Get, Param, Post } from '@nestjs/common';

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
  async readUser(
    @Param('username') username: string,
  ): Promise<UserProfileResponse> {
    console.log(username);
    return this.userService.readUser(username);
  }
}
