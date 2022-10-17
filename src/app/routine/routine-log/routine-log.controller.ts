import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '@app/auth/authentication/jwt.guard';
import { CheckPolicies } from '@app/auth/authorization/policy.decorator';
import { PoliciesGuard } from '@app/auth/authorization/policy.guard';
import { Action } from '@app/auth/authorization/types';
import { RoutineLogCreateRequest } from '@app/routine/routine-log/dtos/routine-log-create.request';
import { RoutineLogProfileResponse } from '@app/routine/routine-log/dtos/routine-log-profile.response';
import { RoutineLogUpdateRequest } from '@app/routine/routine-log/dtos/routine-log-update.request';
import { RoutineLogService } from '@app/routine/routine-log/routine-log.service';
import { RoutineLog } from '@domain/routine/routine-log.entity';
import { Request } from '@infrastructure/types/request.types';

@Controller('routine-logs')
@UseGuards(JwtAuthGuard, PoliciesGuard)
@ApiBearerAuth()
@ApiTags('[루틴] 운동 기록')
export class RoutineLogController {
  constructor(private readonly routineLogService: RoutineLogService) {}

  @Get()
  @CheckPolicies((ability) => ability.can(Action.Read, RoutineLog))
  @ApiOperation({ summary: '운동 기록을 조회합니다.' })
  async getLogList(
    @Req() { user }: Request,
  ): Promise<RoutineLogProfileResponse[]> {
    const result = await this.routineLogService.getLogList(user.id);
    return result.map((log) => new RoutineLogProfileResponse(log));
  }

  @Post()
  @CheckPolicies((ability) => ability.can(Action.Create, RoutineLog))
  @ApiOperation({ summary: '운동 기록을 추가합니다.' })
  @ApiOkResponse({ type: RoutineLogProfileResponse })
  async createLog(
    @Req() { user }: Request,
    @Body() data: RoutineLogCreateRequest,
  ): Promise<RoutineLogProfileResponse> {
    const result = await this.routineLogService.createLog({
      userId: user.id,
      ...data,
    });
    return new RoutineLogProfileResponse(result);
  }

  @Patch(':logId')
  @CheckPolicies((ability) => ability.can(Action.Update, RoutineLog))
  @ApiOperation({ summary: '운동 기록을 수정합니다.' })
  @ApiOkResponse({ type: RoutineLogProfileResponse })
  async updateLog(
    @Req() { user }: Request,
    @Param('logId', ParseUUIDPipe) logId: string,
    @Body() data: RoutineLogUpdateRequest,
  ): Promise<RoutineLogProfileResponse> {
    const result = await this.routineLogService.updateLog(logId, {
      userId: user.id,
      ...data,
    });
    return new RoutineLogProfileResponse(result);
  }

  @Delete(':logId')
  @CheckPolicies((ability) => ability.can(Action.Delete, RoutineLog))
  @ApiOperation({ summary: '운동 기록을 삭제합니다.' })
  @ApiOkResponse({ type: Boolean })
  async deleteLog(
    @Param('logId', ParseUUIDPipe) logId: string,
  ): Promise<boolean> {
    return this.routineLogService.deleteLog(logId);
  }
}
