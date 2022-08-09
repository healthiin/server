import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateEquipmentCoreRequest } from '@app/equipment/equipment-core/dtos/create-equipment-core.request';
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
}
