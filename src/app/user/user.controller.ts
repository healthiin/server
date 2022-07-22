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
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { UserCreateRequest } from '@app/user/dtos/user-create.request';
import { UserProfileUpdateRequest } from '@app/user/dtos/user-profile-update.request';
import { UserProfileResponse } from '@app/user/dtos/user-profile.response';
import { UserService } from '@app/user/user.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '회원가입' })
  @ApiOkResponse({ description: '성공', type: UserProfileResponse })
  @ApiBadRequestResponse({ description: '잘못된 프로퍼티' })
  @ApiConflictResponse({ description: '이미 있던 회원과의 충돌' })
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
  @ApiOkResponse({ description: '성공', type: UserProfileResponse })
  @ApiBadRequestResponse({ description: '회원을 찾지 못함' })
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
  @ApiOkResponse({ description: '성공', type: UserProfileResponse })
  @ApiBadRequestResponse({ description: '잘못된 프로퍼티' })
  @ApiConflictResponse({ description: '이미 있던 회원과의 충돌' })
  @Patch(':id')
  async updateUserProfile(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UserProfileUpdateRequest,
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
  @ApiOkResponse({ description: '성공', type: UserProfileResponse })
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
  @ApiOkResponse({ description: '성공', type: Boolean })
  @ApiBadRequestResponse({ description: '잘못된 프로퍼티' })
  @Delete(':id')
  async withdrawUser(@Param('id', ParseUUIDPipe) id: string): Promise<boolean> {
    return this.userService.withdrawUser(id);
  }
}
