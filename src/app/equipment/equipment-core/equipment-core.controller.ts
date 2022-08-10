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

import { CreateEquipmentCoreRequest } from '@app/equipment/equipment-core/dtos/create-equipment-core.request';
import { EquipmentCoreResponse } from '@app/equipment/equipment-core/dtos/equipment-core.response';
import { UpdateEquipmentCoreRequest } from '@app/equipment/equipment-core/dtos/update-equipment-core.request';
import { EquipmentCoreService } from '@app/equipment/equipment-core/equipment-core.service';

@Controller('equipments')
export class EquipmentCoreController {
  constructor(private readonly equipmentCoreService: EquipmentCoreService) {}

  @Get()
  async getEquipments(): Promise<EquipmentCoreResponse[]> {
    return await this.equipmentCoreService.getEquipments();
  }

  @Post()
  async createEquipment(
    @Body() createEquipmentCoreRequest: CreateEquipmentCoreRequest,
  ): Promise<EquipmentCoreResponse> {
    return await this.equipmentCoreService.createEquipment(
      createEquipmentCoreRequest,
    );
  }

  @Patch(':id')
  async updateEquipment(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateEquipmentCoreRequest: UpdateEquipmentCoreRequest,
  ): Promise<EquipmentCoreResponse> {
    return await this.equipmentCoreService.updateEquipment(
      id,
      updateEquipmentCoreRequest,
    );
  }

  @Delete(':id')
  async deleteEquipment(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<boolean> {
    return await this.equipmentCoreService.deleteEquipment(id);
  }
}
