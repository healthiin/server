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
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { EquipmentProfileResponse } from '@app/equipment/equipment-core/dtos/equipment-profile.response';
import { CreateEquipmentManualRequest } from '@app/equipment/equipment-manual/dtos/create-equipment-manual.request';
import { EquipmentManualProfileResponse } from '@app/equipment/equipment-manual/dtos/equipment-manual-profile.response';
import { UpdateEquipmentManualRequest } from '@app/equipment/equipment-manual/dtos/update-equipment-manual.request';
import { EquipmentManualService } from '@app/equipment/equipment-manual/equipment-manual.service';
import { EQUIPMENT_ERRORS } from '@domain/equipment/equipment.errors';
import { Pagination } from '@infrastructure/types/pagination.types';

@ApiTags('Equipment Manual')
@Controller(':equipmentId/manuals')
export class EquipmentManualController {
  constructor(
    private readonly equipmentManualService: EquipmentManualService,
  ) {}

  @Get()
  @ApiOperation({ summary: '헬스 기구 설명서를 검색합니다.' })
  @ApiOkResponse({ type: [EquipmentProfileResponse] })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 20 })
  @ApiNotFoundResponse({ description: EQUIPMENT_ERRORS.EQUIPMENT_NOT_FOUND })
  async searchManual(
    @Param('equipmentId', ParseUUIDPipe) equipmentId: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ): Promise<Pagination<EquipmentManualProfileResponse>> {
    return this.equipmentManualService.searchManual(equipmentId, page, limit);
  }

  @Get(':manualId')
  @ApiOperation({ summary: '헬스 기구 설명서를 가져옵니다.' })
  @ApiOkResponse({ type: EquipmentManualProfileResponse })
  @ApiNotFoundResponse({ description: EQUIPMENT_ERRORS.EQUIPMENT_NOT_FOUND })
  async getManualProfile(
    @Param('equipmentId', ParseUUIDPipe) equipmentId: string,
    @Param('manualId', ParseUUIDPipe) manualId: string,
  ): Promise<EquipmentManualProfileResponse> {
    return this.equipmentManualService.getManualProfile(manualId);
  }

  @Post()
  @ApiOperation({ summary: '헬스 기구 설명서를 생성합니다.' })
  @ApiOkResponse({ type: EquipmentManualProfileResponse })
  @ApiNotFoundResponse({ description: EQUIPMENT_ERRORS.EQUIPMENT_NOT_FOUND })
  async createManual(
    @Param('equipmentId', ParseUUIDPipe) equipmentId: string,
    @Body() data: CreateEquipmentManualRequest,
  ): Promise<EquipmentManualProfileResponse> {
    return this.equipmentManualService.createManual(equipmentId, data);
  }

  @Patch(':manualId')
  @ApiOperation({ summary: '헬스 기구 설명서를 수정합니다.' })
  @ApiOkResponse({ type: EquipmentManualProfileResponse })
  @ApiNotFoundResponse({ description: EQUIPMENT_ERRORS.EQUIPMENT_NOT_FOUND })
  async updateManual(
    @Param('manualId', ParseUUIDPipe) manualId: string,
    @Param('equipmentId', ParseUUIDPipe) equipmentId: string,
    @Body() data: UpdateEquipmentManualRequest,
  ): Promise<EquipmentManualProfileResponse> {
    return this.equipmentManualService.updateManual(manualId, data);
  }

  @Delete(':manualId')
  @ApiOperation({ summary: '헬스 기구 설명서를 삭제합니다.' })
  @ApiOkResponse({ type: Boolean })
  @ApiNotFoundResponse({ description: EQUIPMENT_ERRORS.EQUIPMENT_NOT_FOUND })
  async deleteManual(
    @Param('equipmentId', ParseUUIDPipe) equipmentId: string,
    @Param('manualId', ParseUUIDPipe) manualId: string,
  ): Promise<boolean> {
    return this.equipmentManualService.deleteManual(manualId);
  }
}
