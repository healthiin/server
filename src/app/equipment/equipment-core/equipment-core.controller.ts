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

import { CreateEquipmentRequest } from '@app/equipment/equipment-core/dtos/create-equipment.request';
import { EquipmentProfileResponse } from '@app/equipment/equipment-core/dtos/equipment-profile.response';
import { UpdateEquipmentRequest } from '@app/equipment/equipment-core/dtos/update-equipment.request';
import { EquipmentCoreService } from '@app/equipment/equipment-core/equipment-core.service';
import { Pagination } from '@infrastructure/types/pagination.types';

@Controller('equipments')
export class EquipmentCoreController {
  constructor(private readonly equipmentCoreService: EquipmentCoreService) {}

  @Get()
  async searchEquipment(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ): Promise<Pagination<EquipmentProfileResponse>> {
    return this.equipmentCoreService.searchEquipment(page, limit);
  }

  @Post()
  async postEquipment(
    @Body() data: CreateEquipmentRequest,
  ): Promise<EquipmentProfileResponse> {
    return this.equipmentCoreService.postEquipment(data);
  }

  @Patch(':equipmentId')
  async updateEquipment(
    @Param('equipmentId', ParseUUIDPipe) equipmentId: string,
    @Body() data: UpdateEquipmentRequest,
  ): Promise<EquipmentProfileResponse> {
    return this.equipmentCoreService.updateEquipment(equipmentId, data);
  }

  @Delete(':equipmentId')
  async deleteEquipment(
    @Param('equipmentId', ParseUUIDPipe) equipmentId: string,
  ): Promise<boolean> {
    return this.equipmentCoreService.deleteEquipment(equipmentId);
  }
}
