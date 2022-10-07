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
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { IPaginationMeta } from 'nestjs-typeorm-paginate';

import { JwtAuthGuard } from '@app/auth/authentication/jwt.guard';
import { CheckPolicies } from '@app/auth/authorization/policy.decorator';
import { PoliciesGuard } from '@app/auth/authorization/policy.guard';
import { Action } from '@app/auth/authorization/types';
import { RoutineCreateRequest } from '@app/routine/routine-core/dtos/routine-create.request';
import { RoutineProfileResponse } from '@app/routine/routine-core/dtos/routine-profile.response';
import { RoutineUpdateRequest } from '@app/routine/routine-core/dtos/routine-update.request';
import { RoutineCoreService } from '@app/routine/routine-core/routine-core.service';
import { Routine as RoutineEntity } from '@domain/routine/routine.entity';
import { Request } from '@infrastructure/types/request.types';

@Controller('routines')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('[루틴] 루틴')
export class RoutineCoreController {
  constructor(private readonly routineService: RoutineCoreService) {}

  @Get('/:routineId')
  @ApiOperation({ summary: '특정 루틴의 내용을 조회합니다' })
  @ApiOkResponse({ type: RoutineProfileResponse })
  async getRoutineProfile(
    @Param('routineId', ParseUUIDPipe) routineId: string,
  ): Promise<RoutineProfileResponse> {
    const routine = await this.routineService.getRoutineById(routineId);
    const days = await this.routineService.getdays(routine.day);
    return new RoutineProfileResponse({ ...routine, days });
  }

  @Get()
  @ApiOperation({ summary: '루틴 목록을 조회합니다' })
  @ApiOkResponse({ type: RoutineProfileResponse })
  async getRoutines(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ): Promise<{
    meta: IPaginationMeta;
    items: Promise<RoutineProfileResponse>[];
  }> {
    return this.routineService.getRoutines({ page, limit });
  }

  @Post()
  @ApiOperation({ summary: '루틴을 생성합니다' })
  @ApiOkResponse({ type: RoutineProfileResponse })
  async createRoutine(
    @Body()
    data: RoutineCreateRequest,
    @Req() { user }: Request,
  ): Promise<RoutineProfileResponse> {
    const routine = await this.routineService.createRoutine({
      userId: user.id,
      ...data,
    });
    const days = await this.routineService.getdays(routine.day);
    return new RoutineProfileResponse({ ...routine, days });
  }

  @Patch('/:routineId')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) => ability.can(Action.Update, RoutineEntity))
  @ApiOperation({ summary: '루틴을 수정합니다' })
  @ApiOkResponse({ type: RoutineProfileResponse })
  async editRoutineProfile(
    @Param('routineId', ParseUUIDPipe) routineId: string,
    @Req() { user }: Request,
    @Body() data: RoutineUpdateRequest,
  ): Promise<RoutineProfileResponse> {
    const routine = await this.routineService.editRoutine({
      routineId,
      userId: user.id,
      ...data,
    });
    const days = await this.routineService.getdays(routine.day);

    return new RoutineProfileResponse({ ...routine, days });
  }

  @Delete('/:routineId')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) => ability.can(Action.Delete, RoutineEntity))
  @ApiOperation({ summary: '루틴을 삭제합니다' })
  @ApiOkResponse({ type: Boolean })
  async deleteRoutine(
    @Param('routineId', ParseUUIDPipe) routineId: string,
  ): Promise<boolean> {
    return this.routineService.deleteRoutine({ routineId });
  }
}
