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
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { RoutineCreateRequest } from '@app/routine/dtos/routine-create.request';
import { RoutineProfileResponse } from '@app/routine/dtos/routine-profile.response';
import { RoutineUpdateRequest } from '@app/routine/dtos/routine-update.request';
import { RoutineService } from '@app/routine/routine.service';
import { Pagination } from '@infrastructure/types/pagination.types';
import { Request } from '@infrastructure/types/request.types';

@Controller('routines')
@ApiTags('[루틴] 루틴')
export class RoutineController {
  constructor(private readonly routineService: RoutineService) {}

  @Get('/:routineId')
  @ApiOperation({ summary: '특정 루틴의 내용을 조회합니다' })
  @ApiOkResponse({ type: RoutineProfileResponse })
  async getRoutineProfile(
    @Param('routineId', ParseUUIDPipe) routineId: string,
  ): Promise<RoutineProfileResponse> {
    const routine = await this.routineService.getRoutineById(routineId);
    return new RoutineProfileResponse(routine);
  }

  @Get()
  @ApiOperation({ summary: '루틴 목록을 조회합니다' })
  @ApiOkResponse({ type: RoutineProfileResponse })
  async getRoutines(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ): Promise<Pagination<RoutineProfileResponse>> {
    return this.routineService.getRoutines({ page, limit });
  }

  @Post()
  @ApiOperation({ summary: '루틴을 생성합니다' })
  @ApiOkResponse({ type: RoutineProfileResponse })
  async createRoutine(
    @Body() data: RoutineCreateRequest,
    // @Req() { user }: Request
  ): Promise<RoutineProfileResponse> {
    const routine = await this.routineService.createRoutine({
      // userId: user.id,
      ...data,
    });
    return new RoutineProfileResponse(routine);
  }

  @Patch('/:routineId')
  @ApiOperation({ summary: '루틴을 수정합니다' })
  @ApiOkResponse({ type: RoutineProfileResponse })
  async editRoutineProfile(
    @Param('routineId', ParseUUIDPipe) routineId: string,
    // @Req() { user }: Request,
    @Body() data: RoutineUpdateRequest,
  ): Promise<RoutineProfileResponse> {
    const routine = await this.routineService.editRoutine({
      routineId,
      // userId: user.id,
      ...data,
    });
    return new RoutineProfileResponse(routine);
  }

  @Delete('/:routineId')
  @ApiOperation({ summary: '루틴을 삭제합니다' })
  @ApiOkResponse({ type: Boolean })
  async deleteRoutine(
    @Param('routineId', ParseUUIDPipe) routineId: string,
  ): Promise<boolean> {
    return this.routineService.deleteRoutine({ routineId });
  }
}
