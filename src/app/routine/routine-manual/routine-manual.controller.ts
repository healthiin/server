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
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '@app/auth/authentication/jwt.guard';
import { RoutineCardioManualCreateRequest } from '@app/routine/routine-manual/dtos/routine-cardio-manual-create.request';
import { RoutineManualProfileResponse } from '@app/routine/routine-manual/dtos/routine-manual-profile.response';
import { RoutineWeightManualCreateRequest } from '@app/routine/routine-manual/dtos/routine-weight-manual-create.request';
import { RoutineManualUpdateRequest } from '@app/routine/routine-manual/routine-manual.command';
import { RoutineManualService } from '@app/routine/routine-manual/routine-manual.service';

@Controller('routine-manuals')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('[메뉴얼] 루틴 메뉴얼')
export class RoutineManualController {
  constructor(private readonly routineManualService: RoutineManualService) {}

  @Post(':manualId/routine/:routineId')
  @ApiOperation({
    summary: '루틴 메뉴얼을 생성합니다.',
  })
  @ApiOkResponse({
    type: RoutineManualProfileResponse,
  })
  async createRoutineManual(
    @Param('manualId', ParseUUIDPipe) manualId: string,
    @Param('routineId', ParseUUIDPipe) routineId: string,
    @Body()
    data: RoutineCardioManualCreateRequest | RoutineWeightManualCreateRequest,
  ): Promise<RoutineManualProfileResponse> {
    return this.routineManualService.createRoutineManual({
      manualId,
      ...data,
      routineId,
    });
  }

  @Get(':routineManualId')
  @ApiOperation({
    summary: '루틴 메뉴얼을 조회합니다.',
  })
  @ApiOkResponse({
    type: RoutineManualProfileResponse,
  })
  async getRoutineManual(
    @Param('routineManualId', ParseUUIDPipe) routineManualId: string,
  ): Promise<RoutineManualProfileResponse> {
    return this.routineManualService.getRoutineManual(routineManualId);
  }

  @Patch(':routineManualId')
  @ApiOperation({
    summary: '루틴 메뉴얼을 수정합니다.',
  })
  async updateRoutineManual(
    @Param('routineManualId', ParseUUIDPipe) routineManualId: string,
    @Body()
    data: RoutineManualUpdateRequest,
  ): Promise<RoutineManualProfileResponse> {
    return this.routineManualService.updateRoutineManual({
      routineManualId,
      ...data,
    });
  }

  @Delete(':routineManualId')
  @ApiOperation({
    summary: '루틴 메뉴얼을 삭제합니다.',
  })
  @ApiOkResponse({ type: Boolean })
  async deleteRoutineManual(
    @Param('routineManualId', ParseUUIDPipe) routineManualId: string,
  ): Promise<boolean> {
    return this.routineManualService.deleteRoutineManual({ routineManualId });
  }
}
