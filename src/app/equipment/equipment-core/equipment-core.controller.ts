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

import { EquipmentCreateRequest } from '@app/equipment/equipment-core/dtos/equipment-create.request';
import { EquipmentProfileResponse } from '@app/equipment/equipment-core/dtos/equipment-profile.response';
import { EquipmentUpdateRequest } from '@app/equipment/equipment-core/dtos/equipment-update.request';
import { EquipmentCoreService } from '@app/equipment/equipment-core/equipment-core.service';

@Controller('equipments')
export class EquipmentCoreController {
  constructor(private readonly equipmentCoreService: EquipmentCoreService) {}

  @Get()
  async getEquipments(): Promise<EquipmentProfileResponse[]> {
    return await this.equipmentCoreService.getEquipments();
  }

  @Post()
  async createEquipment(
    @Body() data: EquipmentCreateRequest,
  ): Promise<EquipmentProfileResponse> {
    const equipment = await this.equipmentCoreService.createEquipment(data);
    return new EquipmentProfileResponse(equipment);
  }

  @Patch(':id')
  async updateEquipment(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: EquipmentUpdateRequest,
  ): Promise<EquipmentProfileResponse> {
    const equipment = await this.equipmentCoreService.updateEquipment({
      equipmentId: id,
      ...data,
    });
    return new EquipmentProfileResponse(equipment);
  }

  @Delete(':id')
  async deleteEquipment(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<boolean> {
    return await this.equipmentCoreService.deleteEquipment({ equipmentId: id });
  }
}
