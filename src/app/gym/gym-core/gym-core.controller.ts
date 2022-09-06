import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
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
import { CreateGymRequest } from '@app/gym/gym-core/dtos/create-gym.request';
import { GymProfileResponse } from '@app/gym/gym-core/dtos/gym-profile.response';
import { UpdateGymProfileRequest } from '@app/gym/gym-core/dtos/update-gym-profile.request';
import { GymCoreService } from '@app/gym/gym-core/gym-core.service';
import { Gym } from '@domain/gym/entities/gym.entity';
import { GYM_ERRORS } from '@domain/gym/gym.errors';
import { Pagination } from '@infrastructure/types/pagination.types';
import { Request } from '@infrastructure/types/request.types';

@Controller('gyms')
@UseGuards(JwtAuthGuard)
@ApiTags('[헬스장] 코어')
@ApiBearerAuth()
export class GymCoreController {
  constructor(private readonly gymCoreService: GymCoreService) {}

  @Get()
  @ApiOperation({ summary: '헬스장을 검색합니다.' })
  @ApiOkResponse({ type: [GymProfileResponse] })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 20 })
  async searchGyms(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ): Promise<Pagination<GymProfileResponse>> {
    return this.gymCoreService.searchGym({ page, limit });
  }

  @Get(':gymId')
  @ApiOperation({ summary: '헬스장 정보를 조회합니다.' })
  @ApiOkResponse({ type: GymProfileResponse })
  @ApiNotFoundResponse({ description: GYM_ERRORS.NOT_FOUND })
  async getGymProfile(
    @Param('gymId', ParseUUIDPipe) gymId: string,
  ): Promise<GymProfileResponse> {
    const gym = await this.gymCoreService.getGymById(gymId);
    return new GymProfileResponse(gym);
  }

  @Post()
  @ApiOperation({ summary: '새로운 헬스장을 추가합니다.' })
  @ApiOkResponse({ type: GymProfileResponse })
  async createGym(
    @Body() data: CreateGymRequest,
    @Req() { user }: Request,
  ): Promise<GymProfileResponse> {
    const gym = await this.gymCoreService.createGym({
      ...data,
      userId: user.id,
    });
    return new GymProfileResponse(gym);
  }

  @Patch(':gymId')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) => ability.can(Action.Manage, Gym))
  @ApiOperation({ summary: '헬스장 정보를 수정합니다.' })
  @ApiOkResponse({ type: GymProfileResponse })
  @ApiNotFoundResponse({ description: GYM_ERRORS.NOT_FOUND })
  async updateGymProfile(
    @Param('gymId', ParseUUIDPipe) gymId: string,
    @Body() data: UpdateGymProfileRequest,
  ): Promise<GymProfileResponse> {
    const gym = await this.gymCoreService.updateGymProfile(gymId, data);
    return new GymProfileResponse(gym);
  }

  @Delete(':gymId')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) => ability.can(Action.Manage, Gym))
  @ApiOperation({ summary: '헬스장을 삭제합니다.' })
  @ApiOkResponse({ type: Boolean })
  @ApiNotFoundResponse({ description: GYM_ERRORS.NOT_FOUND })
  async deleteGym(
    @Param('gymId', ParseUUIDPipe) gymId: string,
  ): Promise<boolean> {
    return this.gymCoreService.deleteGym(gymId);
  }
}
