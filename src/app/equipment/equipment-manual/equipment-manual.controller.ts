import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';

import { EquipmentManualService } from '@app/equipment/equipment-manual/equipment-manual.service';

@Controller('manual/:equipmentId')
export class EquipmentManualController {
  constructor(
    private readonly equipmentManualService: EquipmentManualService,
  ) {}
  @Get()
  async getManuals(
    @Param('equipmentId', ParseUUIDPipe) equipmentId: string,
  ): Promise<Object[]> {
    return this.equipmentManualService.getManuals(equipmentId);
  }

  @Get('/:manualId')
  async getManual(
    @Param('equipmentId', ParseUUIDPipe) equipmentId: string,
    @Param('manualId', ParseUUIDPipe) manualId: string,
  ): Promise<Object> {
    return this.equipmentManualService.getManual(equipmentId, manualId);
  }
}
