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

import { JwtAuthGuard } from '@app/auth/guards/jwt.guard';
import { CreateGymRequest } from '@app/gym/dtos/create-gym.request';
import { GymProfileResponse } from '@app/gym/dtos/gym-profile.response';
import { UpdateGymProfileRequest } from '@app/gym/dtos/update-gym-profile.request';
import { GymService } from '@app/gym/gym.service';
import { GYM_ERRORS } from '@domain/gym/gym.errors';
import { Pagination } from '@infrastructure/types/pagination.types';
import { Request } from '@infrastructure/types/request.types';

@Controller('gyms')
@ApiTags('Gym')
export class GymController {
  constructor(private readonly gymService: GymService) {}

  @Get()
  @ApiOperation({ summary: '헬스장을 검색합니다.' })
  @ApiOkResponse({ type: [GymProfileResponse] })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 20 })
  async searchGyms(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ): Promise<Pagination<GymProfileResponse>> {
    return this.gymService.searchGym(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: '헬스장 정보를 조회합니다.' })
  @ApiOkResponse({ type: GymProfileResponse })
  @ApiNotFoundResponse({ description: GYM_ERRORS.NOT_FOUND })
  async getGymProfile(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<GymProfileResponse> {
    return this.gymService.getGymProfile(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '새로운 헬스장을 추가합니다.' })
  @ApiOkResponse({ type: GymProfileResponse })
  @ApiBearerAuth()
  async createGym(
    @Body() data: CreateGymRequest,
    @Req() { user }: Request,
  ): Promise<GymProfileResponse> {
    return this.gymService.createGym(data, user);
  }

  @Patch(':id')
  @ApiOperation({ summary: '헬스장 정보를 수정합니다.' })
  @ApiOkResponse({ type: GymProfileResponse })
  @ApiNotFoundResponse({ description: GYM_ERRORS.NOT_FOUND })
  async updateGymProfile(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateGymProfileRequest,
  ): Promise<GymProfileResponse> {
    return this.gymService.updateGymProfile(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: '헬스장을 삭제합니다.' })
  @ApiOkResponse({ type: Boolean })
  @ApiNotFoundResponse({ description: GYM_ERRORS.NOT_FOUND })
  async deleteGym(@Param('id', ParseUUIDPipe) id: string): Promise<boolean> {
    return this.deleteGym(id);
  }
}
