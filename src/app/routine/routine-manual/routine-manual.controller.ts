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
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '@app/auth/authentication/jwt.guard';
import { RoutineCardioManualCreateRequest } from '@app/routine/routine-manual/dtos/routine-cardio-manual-create.request';
import { RoutineCardioManualUpdateRequest } from '@app/routine/routine-manual/dtos/routine-cardio-manual-update.request';
import { RoutineManualProfileResponse } from '@app/routine/routine-manual/dtos/routine-manual-profile.response';
import { RoutineWeightManualCreateRequest } from '@app/routine/routine-manual/dtos/routine-weight-manual-create.request';
import { RoutineWeightManualUpdateRequest } from '@app/routine/routine-manual/dtos/routine-weight-manual-update.request';
import { RoutineManualService } from '@app/routine/routine-manual/routine-manual.service';

@Controller('routine-manuals')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('[메뉴얼] 루틴 메뉴얼')
export class RoutineManualController {
  constructor(private readonly routineManualService: RoutineManualService) {}

  @Post(':manualId/routine/:routineId')
  @ApiBody({
    description: '운동 종류에 따라 다른 데이터를 입력합니다.',
    schema: {
      oneOf: [
        {
          $ref: getSchemaPath(RoutineWeightManualCreateRequest),
        },
        {
          $ref: getSchemaPath(RoutineCardioManualCreateRequest),
        },
      ],
    },
    examples: {
      weight: {
        value: {
          weight: 20,
          setNumber: 3,
          targetNumber: 15,
          order: 1,
        },
      },
      cardio: {
        value: {
          speed: 7,
          playMinute: 30,
          order: 1,
        },
      },
    },
  })
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
  @ApiBody({
    description: '운동 종류에 따라 다른 데이터를 입력합니다.',
    schema: {
      oneOf: [
        {
          $ref: getSchemaPath(RoutineCardioManualUpdateRequest),
        },
        {
          $ref: getSchemaPath(RoutineWeightManualUpdateRequest),
        },
      ],
    },
    examples: {
      weight: {
        value: {
          weight: 20,
          setNumber: 3,
          targetNumber: 15,
          order: 1,
          manualId: '9683de37-28c1-4108-af86-0b36001e97f0',
          days: [1, 1, 0, 0, 0, 0, 0],
        },
      },
      cardio: {
        value: {
          speed: 7,
          playMinute: 30,
          order: 1,
          manualId: '9683de37-28c1-4108-af86-0b36001e97f0',
          days: [1, 1, 0, 0, 0, 0, 0],
        },
      },
    },
  })
  @ApiOperation({
    summary: '루틴 메뉴얼을 수정합니다.',
  })
  async updateRoutineManual(
    @Param('routineManualId', ParseUUIDPipe) routineManualId: string,
    @Body()
    data: RoutineCardioManualUpdateRequest | RoutineWeightManualUpdateRequest,
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
