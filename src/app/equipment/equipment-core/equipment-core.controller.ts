import { Body, Controller, Get, Patch, Post } from '@nestjs/common';

import { CreateEquipmentCoreRequest } from '@app/equipment/equipment-core/dtos/create-equipment-core.request';
import { UpdateEquipmentCoreRequest } from '@app/equipment/equipment-core/dtos/update-equipment-core.request';
import { EquipmentCoreService } from '@app/equipment/equipment-core/equipment-core.service';

@Controller('equipment')
export class EquipmentCoreController {
  constructor(private readonly equipmentCoreService: EquipmentCoreService) {}

  @Get()
  async getEquipments(): Promise<object[]> {
    return await this.equipmentCoreService.getEquipments();
  }

  @Post()
  async createEquipment(
    @Body() createEquipmentCoreRequest: CreateEquipmentCoreRequest,
  ): Promise<object> {
    return await this.equipmentCoreService.createEquipment(
      createEquipmentCoreRequest,
    );
  }

  @Patch()
  async updateEquipment(
    @Body() updateEquipmentCoreRequest: UpdateEquipmentCoreRequest,
  ): Promise<object> {
    return await this.equipmentCoreService.updateEquipment(
      updateEquipmentCoreRequest,
    );
  }
}
