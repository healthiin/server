import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';

import { CreateManualRequest } from '@app/equipment/equipment-manual/dtos/create-manual.request';
import { ManualProfileResponse } from '@app/equipment/equipment-manual/dtos/manual-profile.response';
import { EquipmentManualService } from '@app/equipment/equipment-manual/equipment-manual.service';

@Controller('manual/:equipmentId')
export class EquipmentManualController {
  constructor(
    private readonly equipmentManualService: EquipmentManualService,
  ) {}
  @Get()
  async getManuals(
    @Param('equipmentId', ParseUUIDPipe) equipmentId: string,
  ): Promise<ManualProfileResponse[]> {
    return this.equipmentManualService.getManuals(equipmentId);
  }

  @Get('/:manualId')
  async getManual(
    @Param('equipmentId', ParseUUIDPipe) equipmentId: string,
    @Param('manualId', ParseUUIDPipe) manualId: string,
  ): Promise<ManualProfileResponse> {
    return this.equipmentManualService.getManual(equipmentId, manualId);
  }

  @Post()
  async createManual(
    @Param('equipmentId', ParseUUIDPipe) equipmentId: string,
    @Body() data: CreateManualRequest,
  ): Promise<ManualProfileResponse> {
    console.log('11');
    console.log(data);
    return this.equipmentManualService.createManual(equipmentId, data);
  }
}
