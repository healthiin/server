import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '@app/auth/authentication/jwt.guard';
import { UserCreateRequest } from '@app/user/dtos/user-create.request';
import { UserProfileUpdateRequest } from '@app/user/dtos/user-profile-update.request';
import { UserProfileResponse } from '@app/user/dtos/user-profile.response';
import { UserService } from '@app/user/user.service';
import { USER_ERRORS } from '@domain/user/user.errors';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: '새로운 회원을 가입처리합니다.' })
  @ApiCreatedResponse({ type: UserProfileResponse })
  @ApiBadRequestResponse({ description: USER_ERRORS.INVALID_NICKNAME_LENGTH })
  @ApiNotFoundResponse({ description: USER_ERRORS.USER_NOT_FOUND })
  @ApiConflictResponse({
    description: [
      USER_ERRORS.DUPLICATED_NICKNAME,
      USER_ERRORS.DUPLICATED_USERNAME,
    ].join(', '),
  })
  async joinUser(
    @Body() data: UserCreateRequest,
  ): Promise<UserProfileResponse> {
    return this.userService.createUser(data);
  }

  @Post('join/:gymId')
  async joinGym(
    @Param('id', ParseUUIDPipe) gymId: string,
    @Body() data: { id: string },
  ): Promise<boolean> {
    return this.userService.joinGym(gymId, data.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '회원 상세 정보를 조회합니다.' })
  @ApiOkResponse({ type: UserProfileResponse })
  @ApiNotFoundResponse({ description: USER_ERRORS.USER_NOT_FOUND })
  @ApiBearerAuth()
  async getUserProfile(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<UserProfileResponse> {
    return this.userService.getUserProfile(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '회원 프로필을 수정합니다.' })
  @ApiOkResponse({ type: UserProfileResponse })
  @ApiNotFoundResponse({ description: USER_ERRORS.USER_NOT_FOUND })
  @ApiConflictResponse({
    description: [
      USER_ERRORS.DUPLICATED_NICKNAME,
      USER_ERRORS.DUPLICATED_USERNAME,
    ].join(', '),
  })
  @ApiBearerAuth()
  async updateUserProfile(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UserProfileUpdateRequest,
  ): Promise<UserProfileResponse> {
    return this.userService.updateUserProfile(id, data);
  }

  @Patch(':id/password')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '회원 비밀번호를 변경합니다.' })
  @ApiOkResponse({ type: UserProfileResponse })
  @ApiNotFoundResponse({ description: USER_ERRORS.USER_NOT_FOUND })
  @ApiBearerAuth()
  async updateUserPassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: { password: string },
  ): Promise<UserProfileResponse> {
    return this.userService.updateUserPassword(id, data.password);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '회원을 탈퇴처리 합니다.' })
  @ApiOkResponse({ type: Boolean })
  @ApiNotFoundResponse({ description: USER_ERRORS.USER_NOT_FOUND })
  @ApiBearerAuth()
  async withdrawUser(@Param('id', ParseUUIDPipe) id: string): Promise<boolean> {
    return this.userService.withdrawUser(id);
  }
}
