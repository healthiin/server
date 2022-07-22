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
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UserCreateRequest } from '@app/user/dtos/user-create.request';
import { UserProfileResponse } from '@app/user/dtos/user-profile.response';
import { UserUpdateRequest } from '@app/user/dtos/user-update.request';
import { UserService } from '@app/user/user.service';

@ApiTags('USERS')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({ status: 201, description: '성공', type: UserProfileResponse })
  @ApiResponse({
    status: 400,
    description: '잘못된 프로퍼티',
  })
  @ApiResponse({
    status: 409,
    description: '이미 있던 회원과의 충돌',
  })
  @Post()
  async joinUser(
    @Body() data: UserCreateRequest,
  ): Promise<UserProfileResponse> {
    return this.userService.createUser(data);
  }

  @ApiOperation({ summary: '특정 회원 상세 정보 획득' })
  @ApiParam({
    name: 'id',
    required: true,
    description: '회원의 id(uuid형태)',
    example: '94eb7e95-47b2-49c1-a121-b2919ddc983c',
  })
  @ApiResponse({ status: 200, description: '성공', type: UserProfileResponse })
  @ApiResponse({ status: 400, description: '회원을 찾지 못함' })
  @Get(':id')
  async getUserProfile(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<UserProfileResponse> {
    return this.userService.getUserProfile(id);
  }

  @ApiOperation({ summary: '특정 회원 상세 정보 변경' })
  @ApiParam({
    name: 'id',
    required: true,
    description: '회원의 id(uuid형태)',
    example: '94eb7e95-47b2-49c1-a121-b2919ddc983c',
  })
  @ApiResponse({ status: 200, description: '성공', type: UserProfileResponse })
  @ApiResponse({
    status: 400,
    description: '잘못된 프로퍼티',
  })
  @ApiResponse({
    status: 409,
    description: '이미 있던 회원과의 충돌',
  })
  @Patch(':id')
  async updateUserProfile(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UserUpdateRequest,
  ): Promise<UserProfileResponse> {
    return this.userService.updateUserProfile(id, data);
  }

  @ApiOperation({ summary: '특정 회원 비밀번호 변경' })
  @ApiParam({
    name: 'id',
    required: true,
    description: '회원의 id(uuid형태)',
    example: '94eb7e95-47b2-49c1-a121-b2919ddc983c',
  })
  @ApiResponse({ status: 200, description: '성공', type: UserProfileResponse })
  @Patch(':id/password')
  async updateUserPassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: { password: string },
  ): Promise<UserProfileResponse> {
    return this.userService.updateUserPassword(id, data.password);
  }

  @ApiOperation({ summary: '특정 회원 탈퇴' })
  @ApiParam({
    name: 'id',
    required: true,
    description: '회원의 id(uuid형태)',
    example: '94eb7e95-47b2-49c1-a121-b2919ddc983c',
  })
  @ApiResponse({ status: 200, description: '성공', type: Boolean })
  @ApiResponse({ status: 400, description: '잘못된 프로퍼티' })
  @Delete(':id')
  async withdrawUser(@Param('id', ParseUUIDPipe) id: string): Promise<boolean> {
    return this.userService.withdrawUser(id);
  }
}
