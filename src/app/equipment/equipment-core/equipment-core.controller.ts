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

import { CreateEquipmentRequest } from '@app/equipment/equipment-core/dtos/create-equipment.request';
import { EquipmentProfileResponse } from '@app/equipment/equipment-core/dtos/equipment-profile.response';
import { UpdateEquipmentRequest } from '@app/equipment/equipment-core/dtos/update-equipment.request';
import { EquipmentCoreService } from '@app/equipment/equipment-core/equipment-core.service';
import { EQUIPMENT_ERRORS } from '@domain/equipment/equipment.errors';
import { Pagination } from '@infrastructure/types/pagination.types';

@Controller('equipments')
@ApiTags('Equipment')
export class EquipmentCoreController {
  constructor(private readonly equipmentCoreService: EquipmentCoreService) {}

  @Get()
  @ApiOperation({ summary: '헬스 기구를 검색합니다.' })
  @ApiOkResponse({ type: [EquipmentProfileResponse] })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 20 })
  @ApiNotFoundResponse({ description: EQUIPMENT_ERRORS.EQUIPMENT_NOT_FOUND })
  async searchEquipment(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ): Promise<Pagination<EquipmentProfileResponse>> {
    return this.equipmentCoreService.searchEquipment(page, limit);
  }

  @Post()
  @ApiOperation({ summary: '헬스 기구를 생성합니다.' })
  @ApiOkResponse({ type: EquipmentProfileResponse })
  async postEquipment(
    @Body() data: CreateEquipmentRequest,
  ): Promise<EquipmentProfileResponse> {
    return this.equipmentCoreService.postEquipment(data);
  }

  @Patch(':equipmentId')
  @ApiOperation({ summary: '헬스 기구를 수정합니다.' })
  @ApiOkResponse({ type: EquipmentProfileResponse })
  @ApiNotFoundResponse({ description: EQUIPMENT_ERRORS.EQUIPMENT_NOT_FOUND })
  async updateEquipment(
    @Param('equipmentId', ParseUUIDPipe) equipmentId: string,
    @Body() data: UpdateEquipmentRequest,
  ): Promise<EquipmentProfileResponse> {
    return this.equipmentCoreService.updateEquipment(equipmentId, data);
  }

  @Delete(':equipmentId')
  @ApiOperation({ summary: '헬스 기구를 삭제합니다.' })
  @ApiOkResponse({ type: Boolean })
  @ApiNotFoundResponse({ description: EQUIPMENT_ERRORS.EQUIPMENT_NOT_FOUND })
  async deleteEquipment(
    @Param('equipmentId', ParseUUIDPipe) equipmentId: string,
  ): Promise<boolean> {
    return this.equipmentCoreService.deleteEquipment(equipmentId);
  }
}
