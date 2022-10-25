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
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

import { ManualCreateRequest } from '@app/equipment/equipment-manual/dtos/manual-create.request';
import { ManualProfileResponse } from '@app/equipment/equipment-manual/dtos/manual-profile.response';
import { ManualUpdateRequest } from '@app/equipment/equipment-manual/dtos/manual-update.request';
import { EquipmentManualService } from '@app/equipment/equipment-manual/equipment-manual.service';
import { RoutineCardioManualCreateRequest } from '@app/routine/routine-manual/dtos/routine-cardio-manual-create.request';
import { RoutineWeightManualCreateRequest } from '@app/routine/routine-manual/dtos/routine-weight-manual-create.request';
import { ManualType } from '@domain/equipment/manual-type';
import { MANUAL_ERRORS } from '@domain/equipment/manual.errors';

@Controller('manuals')
@ApiTags('[메뉴얼] 메뉴얼')
export class EquipmentManualController {
  constructor(private readonly manualService: EquipmentManualService) {}

  @Get()
  @ApiOperation({ summary: '모든 설명서를 조회합니다.' })
  @ApiOkResponse({ type: [ManualProfileResponse] })
  async getAllManuals(): Promise<ManualProfileResponse[]> {
    return this.manualService.getAllManuals();
  }

  @Get('/:manualId')
  @ApiOperation({ summary: '설명서 상세 정보를 조회합니다.' })
  @ApiOkResponse({ type: ManualProfileResponse })
  async getManualById(
    @Param('manualId', ParseUUIDPipe) manualId: string,
  ): Promise<ManualProfileResponse> {
    return this.manualService.getManualById(manualId);
  }

  @Get('category/:category')
  @ApiOperation({ summary: '카테고리별 설명서를 조회합니다.' })
  @ApiOkResponse({ type: [ManualProfileResponse] })
  async getManualsByType(
    @Param('category')
    type: ManualType,
  ): Promise<ManualProfileResponse[]> {
    return this.manualService.getManualsByType(type);
  }

  @Get('equipment/:equipmentId')
  @ApiOperation({ summary: '해당 기구를 사용하는 운동 목록을 조회합니다.' })
  @ApiOkResponse({ type: [ManualProfileResponse] })
  @ApiNotFoundResponse({
    description: MANUAL_ERRORS.EQUIPMENT_MANUAL_NOT_FOUND,
  })
  async getManualsByEquipmentId(
    @Param('equipmentId') equipmentId: string,
  ): Promise<ManualProfileResponse[]> {
    return this.manualService.getManualsByEquipmentId(equipmentId);
  }

  @Post('/:equipmentId')
  @ApiOperation({ summary: '특정 헬스 기구에 대한 설명서를 등록합니다.' })
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
      무산소: {
        value: {
          weight: 20,
          setNumber: 3,
          targetNumber: 15,
          order: 1,
        },
      },
      유산소: {
        value: {
          speed: 7,
          playMinute: 30,
          order: 1,
        },
      },
    },
  })
  @ApiCreatedResponse({ type: ManualProfileResponse })
  @ApiNotFoundResponse({
    description: MANUAL_ERRORS.EQUIPMENT_MANUAL_NOT_FOUND,
  })
  async createManual(
    @Param('equipmentId', ParseUUIDPipe) equipmentId: string,
    @Body() data: ManualCreateRequest,
  ): Promise<ManualProfileResponse> {
    const manual = await this.manualService.createManual({
      equipmentId,
      ...data,
    });
    return new ManualProfileResponse(manual);
  }

  @Patch('/:manualId')
  @ApiOperation({ summary: '특정 설명서를 수정합니다.' })
  @ApiOkResponse({ type: ManualProfileResponse })
  @ApiNotFoundResponse({
    description: MANUAL_ERRORS.EQUIPMENT_MANUAL_NOT_FOUND,
  })
  async updateManual(
    @Param('manualId', ParseUUIDPipe) manualId: string,
    @Body() data: ManualUpdateRequest,
  ): Promise<ManualProfileResponse> {
    const manual = await this.manualService.updateManual({
      manualId,
      ...data,
    });

    return new ManualProfileResponse(manual);
  }

  @Delete('/:manualId')
  @ApiOperation({ summary: '특정 설명서를 삭제합니다.' })
  @ApiOkResponse({ type: Boolean })
  @ApiNotFoundResponse({
    description: MANUAL_ERRORS.EQUIPMENT_MANUAL_NOT_FOUND,
  })
  async withdrawManual(
    @Param('manualId', ParseUUIDPipe) manualId: string,
  ): Promise<boolean> {
    return this.manualService.withdrawManual({ manualId });
  }
}
