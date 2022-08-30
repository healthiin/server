import {
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '@app/auth/authentication/jwt.guard';
import { CheckPolicies } from '@app/auth/authorization/policy.decorator';
import { PoliciesGuard } from '@app/auth/authorization/policy.guard';
import { Action } from '@app/auth/authorization/types';
import { GymUserProfileResponse } from '@app/gym/gym-user/dtos/gym-user-profile.response';
import { GymUserService } from '@app/gym/gym-user/gym-user.service';
import { USER_ERRORS } from '@domain/errors/user.errors';
import { Gym } from '@domain/gym/entities/gym.entity';
import { GYM_ERRORS } from '@domain/gym/gym.errors';
import { Pagination } from '@infrastructure/types/pagination.types';

@Controller('gyms/:gymId/users')
@UseGuards(JwtAuthGuard, PoliciesGuard)
@CheckPolicies((ability) => ability.can(Action.Manage, Gym))
@ApiTags('Gym User')
@ApiBearerAuth()
export class GymUserController {
  constructor(private readonly gymUserService: GymUserService) {}

  @Get()
  @ApiOperation({ summary: '헬스장 구성원 목록을 조회합니다.' })
  @ApiOkResponse()
  @ApiNotFoundResponse({ description: GYM_ERRORS.NOT_FOUND })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 20 })
  async getUserList(
    @Param('gymId', ParseUUIDPipe) gymId: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ): Promise<Pagination<GymUserProfileResponse>> {
    return this.gymUserService.getUserList(gymId, page, limit);
  }

  @Post(':userId')
  @ApiOperation({ summary: '헬스장 구성원을 추가합니다.' })
  @ApiOkResponse({ type: GymUserProfileResponse })
  @ApiNotFoundResponse({
    description: [GYM_ERRORS.NOT_FOUND, USER_ERRORS.USER_NOT_FOUND].join(', '),
  })
  async addUserToGym(
    @Param('gymId', ParseUUIDPipe) gymId: string,
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<GymUserProfileResponse> {
    return this.gymUserService.addUserToGym(gymId, userId);
  }

  @Delete(':userId')
  @ApiOperation({ summary: '헬스장 구성원을 제거합니다.' })
  @ApiOkResponse({ type: Boolean })
  @ApiNotFoundResponse({
    description: [GYM_ERRORS.NOT_FOUND, USER_ERRORS.USER_NOT_FOUND].join(', '),
  })
  async deleteUserFromGym(
    @Param('gymId', ParseUUIDPipe) gymId: string,
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<boolean> {
    return this.gymUserService.deleteUserFromGym(gymId, userId);
  }
}
