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
} from '@nestjs/common';

import { RoutineCreateRequest } from '@app/routine/dtos/routine-create.request';
import { RoutineProfileResponse } from '@app/routine/dtos/routine-profile.response';
import { RoutineUpdateRequest } from '@app/routine/dtos/routine-update.request';
import { RoutineService } from '@app/routine/routine.service';
import { Pagination } from '@infrastructure/types/pagination.types';

@Controller('routines')
export class RoutineController {
  constructor(private readonly routineService: RoutineService) {}

  @Get('/:routineId')
  async getRoutineProfile(
    @Param('routineId', ParseUUIDPipe) routineId: string,
  ) {
    const routine = await this.routineService.getRoutineById(routineId);
    return new RoutineProfileResponse(routine);
  }

  @Get()
  async getRoutines(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ): Promise<Pagination<RoutineProfileResponse>> {
    return this.routineService.getRoutines({ page, limit });
  }

  @Post()
  async createRoutine(@Body() data: RoutineCreateRequest) {
    const routine = await this.routineService.createRoutine({
      ...data,
    });
    console.log(routine);
    return new RoutineProfileResponse(routine);
  }

  @Patch('/:routineId')
  async editRoutineProfile(
    @Param('routineId', ParseUUIDPipe) routineId: string,
    @Body() data: RoutineUpdateRequest,
  ) {
    const routine = await this.routineService.editRoutine({
      ...data,
    });
    return new RoutineProfileResponse(routine);
  }

  @Delete('/:routineId')
  async deleteRoutine(
    @Param('routineId', ParseUUIDPipe) routineId: string,
  ): Promise<boolean> {
    return this.routineService.deleteRoutine({ routineId });
  }
}
