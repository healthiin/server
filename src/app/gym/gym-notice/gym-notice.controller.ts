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
import { GymProfileResponse } from '@app/gym/gym-core/dtos/gym-profile.response';
import { CreateGymNoticeRequest } from '@app/gym/gym-notice/dtos/create-gym-notice.request';
import { GymNoticeProfileResponse } from '@app/gym/gym-notice/dtos/gym-notice-profile.response';
import { UpdateGymNoticeRequest } from '@app/gym/gym-notice/dtos/update-gym-notice.request';
import { GymNoticeService } from '@app/gym/gym-notice/gym-notice.service';
import { Gym } from '@domain/gym/entities/gym.entity';
import { GYM_ERRORS } from '@domain/gym/gym.errors';
import { Pagination } from '@infrastructure/types/pagination.types';
import { Request } from '@infrastructure/types/request.types';

@Controller('gyms/:gymId/notices')
@UseGuards(JwtAuthGuard)
@ApiTags('[헬스장] 공지사항')
@ApiBearerAuth()
export class GymNoticeController {
  constructor(private readonly gymNoticeService: GymNoticeService) {}

  @Get()
  @ApiOperation({ summary: '헬스장 공지를 검색합니다.' })
  @ApiOkResponse({ type: [GymProfileResponse] })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 20 })
  async searchNotice(
    @Param('gymId', ParseUUIDPipe) gymId: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ): Promise<Pagination<GymNoticeProfileResponse>> {
    return this.gymNoticeService.searchNotice({ gymId, page, limit });
  }

  @Get(':noticeId')
  @ApiOperation({ summary: '헬스장 공지를 조회합니다.' })
  @ApiOkResponse({ type: GymProfileResponse })
  @ApiNotFoundResponse({ description: GYM_ERRORS.NOT_FOUND })
  async getNoticeProfile(
    @Param('gymId', ParseUUIDPipe) gymId: string,
    @Param('noticeId', ParseUUIDPipe) noticeId: string,
  ): Promise<GymNoticeProfileResponse> {
    const notice = await this.gymNoticeService.getNoticeById({
      gymId,
      noticeId,
    });
    return new GymNoticeProfileResponse(notice);
  }

  @Post()
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) => ability.can(Action.Manage, Gym))
  @ApiOperation({ summary: '새로운 공지를 작성합니다.' })
  @ApiOkResponse({ type: GymProfileResponse })
  async createNotice(
    @Param('gymId', ParseUUIDPipe) gymId: string,
    @Body() data: CreateGymNoticeRequest,
    @Req() { user }: Request,
  ): Promise<GymNoticeProfileResponse> {
    const notice = await this.gymNoticeService.createNotice({
      gymId,
      userId: user.id,
      ...data,
    });
    return new GymNoticeProfileResponse(notice);
  }

  @Patch(':noticeId')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) => ability.can(Action.Manage, Gym))
  @ApiOperation({ summary: '헬스장 공지를 수정합니다.' })
  @ApiOkResponse({ type: GymProfileResponse })
  @ApiNotFoundResponse({ description: GYM_ERRORS.NOT_FOUND })
  async updateNoticeProfile(
    @Param('gymId', ParseUUIDPipe) gymId: string,
    @Param('noticeId', ParseUUIDPipe) noticeId: string,
    @Body() data: UpdateGymNoticeRequest,
  ): Promise<GymNoticeProfileResponse> {
    const notice = await this.gymNoticeService.updateNoticeProfile({
      gymId,
      noticeId,
      ...data,
    });
    return new GymNoticeProfileResponse(notice);
  }

  @Delete(':noticeId')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) => ability.can(Action.Manage, Gym))
  @ApiOperation({ summary: '헬스장 공지를 삭제합니다.' })
  @ApiOkResponse({ type: Boolean })
  @ApiNotFoundResponse({ description: GYM_ERRORS.NOT_FOUND })
  async deleteNotice(
    @Param('gymId', ParseUUIDPipe) gymId: string,
    @Param('noticeId', ParseUUIDPipe) noticeId: string,
  ): Promise<boolean> {
    return this.gymNoticeService.deleteNotice({
      gymId,
      noticeId,
    });
  }
}
