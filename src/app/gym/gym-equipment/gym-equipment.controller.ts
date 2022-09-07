import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';

import { EquipmentProfileResponse } from '@app/equipment/equipment-core/dtos/equipment-profile.response';
import { GymEquipmentService } from '@app/gym/gym-equipment/gym-equipment.service';

@Controller('gyms/:gymId/equipments')
export class GymEquipmentController {
  constructor(private readonly gymEquipmentService: GymEquipmentService) {}

  @Get()
  async getGymEquipmentById(
    @Param('gymId', ParseUUIDPipe) gymId: string,
  ): Promise<EquipmentProfileResponse[]> {
    return this.gymEquipmentService.getGymEquipmentById(gymId);
  }

  @Post('/:equipmentId')
  async addGymEquipment(
    @Param('gymId', ParseUUIDPipe) gymId: string,
    @Param('equipmentId', ParseUUIDPipe) equipmentId: string,
  ): Promise<EquipmentProfileResponse[]> {
    return this.gymEquipmentService.addGymEquipment(gymId, equipmentId);
  }

  @Delete('/:equipmentId')
  async deleteGymEquipment(
    @Param('gymId', ParseUUIDPipe) gymId: string,
    @Param('equipmentId', ParseUUIDPipe) equipmentId: string,
  ): Promise<boolean> {
    return this.gymEquipmentService.deleteGymEquipment(gymId, equipmentId);
  }
}
