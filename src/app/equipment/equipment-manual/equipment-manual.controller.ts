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
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { ManualCreateRequest } from '@app/equipment/equipment-manual/dtos/manual-create.request';
import { ManualProfileResponse } from '@app/equipment/equipment-manual/dtos/manual-profile.response';
import { ManualUpdateRequest } from '@app/equipment/equipment-manual/dtos/manual-update.request';
import { EquipmentManualService } from '@app/equipment/equipment-manual/equipment-manual.service';
import { MANUAL_ERRORS } from '@domain/equipment/manual.errors';

@Controller('manuals')
@ApiTags('[헬스 기구] 설명서')
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
    type: 'back' | 'shoulder' | 'chest' | 'arm' | 'lef' | 'abs',
  ): Promise<ManualProfileResponse[]> {
    return this.manualService.getManualsByType(type);
  }

  @Post('/:equipmentId')
  @ApiOperation({ summary: '특정 헬스 기구에 대한 설명서를 등록합니다.' })
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
