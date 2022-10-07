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

import { RoutineUpdateRequest } from '@app/routine/routine-core/dtos/routine-update.request';
import { RoutineCardioManualCreateRequest } from '@app/routine/routine-manual/dtos/routine-cardio-manual-create.request';
import { RoutineManualProfileResponse } from '@app/routine/routine-manual/dtos/routine-manual-profile.response';
import { RoutineWeightManualCreateRequest } from '@app/routine/routine-manual/dtos/routine-weight-manual-create.request';
import { RoutineManualService } from '@app/routine/routine-manual/routine-manual.service';

@Controller('routine-manual')
export class RoutineManualController {
  constructor(private readonly routineManualService: RoutineManualService) {}

  @Post(':manualId')
  async createRoutineManual(
    @Param('manualId', ParseUUIDPipe) manualId: string,
    @Body()
    data: RoutineCardioManualCreateRequest | RoutineWeightManualCreateRequest,
  ): Promise<RoutineManualProfileResponse> {
    return this.routineManualService.createRoutineManual({
      manualId,
      ...data,
    });
  }

  @Get(':routineManualId')
  async getRoutineManual(
    @Param('routineManualId', ParseUUIDPipe) routineManualId: string,
  ): Promise<RoutineManualProfileResponse> {
    return this.routineManualService.getRoutineManual(routineManualId);
  }

  @Patch(':routineManualId')
  async updateRoutineManual(
    @Param('routineManualId', ParseUUIDPipe) routineManualId: string,
    @Body() data: RoutineUpdateRequest,
  ): Promise<RoutineManualProfileResponse> {
    return this.routineManualService.updateRoutineManual({
      routineManualId,
      ...data,
    });
  }

  @Delete(':routineManualId')
  async deleteRoutineManual(
    @Param('routineManualId', ParseUUIDPipe) routineManualId: string,
  ): Promise<boolean> {
    return this.routineManualService.deleteRoutineManual({ routineManualId });
  }
}
