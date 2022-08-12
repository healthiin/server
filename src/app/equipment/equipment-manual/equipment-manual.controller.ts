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

import { CreateManualRequest } from '@app/equipment/equipment-manual/dtos/create-manual.request';
import { ManualProfileResponse } from '@app/equipment/equipment-manual/dtos/manual-profile.response';
import { UpdateManualRequest } from '@app/equipment/equipment-manual/dtos/update-manual.request';
import { EquipmentManualService } from '@app/equipment/equipment-manual/equipment-manual.service';

@Controller('manual')
export class EquipmentManualController {
  constructor(
    private readonly equipmentManualService: EquipmentManualService,
  ) {}
  @Get()
  async getAllManuals(): Promise<ManualProfileResponse[]> {
    return this.equipmentManualService.getAllManuals();
  }

  @Get('equipment/:equipmentId')
  async getManualsByEquipments(
    @Param('equipmentId', ParseUUIDPipe) equipmentId: string,
  ): Promise<ManualProfileResponse[]> {
    return this.equipmentManualService.getManualsByEquipment(equipmentId);
  }

  @Get(':manualId')
  async getManual(
    @Param('manualId', ParseUUIDPipe) manualId: string,
  ): Promise<ManualProfileResponse> {
    return this.equipmentManualService.getManual(manualId);
  }

  @Post(':equipmentId')
  async createManual(
    @Param('equipmentId', ParseUUIDPipe) equipmentId: string,
    @Body() data: CreateManualRequest,
  ): Promise<ManualProfileResponse> {
    return this.equipmentManualService.createManual(equipmentId, data);
  }

  @Patch(':equipmentId/:manualId')
  async updateManual(
    @Param('equipmentId', ParseUUIDPipe) equipmentId: string,
    @Param('manualId', ParseUUIDPipe) manualId: string,
    @Body() data: UpdateManualRequest,
  ): Promise<ManualProfileResponse> {
    return this.equipmentManualService.updateManual(
      equipmentId,
      manualId,
      data,
    );
  }
  @Delete(':equipmentId/:manualId')
  async deleteManual(
    @Param('equipmentId', ParseUUIDPipe) equipmentId: string,
    @Param('manualId', ParseUUIDPipe) manualId: string,
  ): Promise<ManualProfileResponse> {
    return this.equipmentManualService.deleteManual(equipmentId, manualId);
  }
}
