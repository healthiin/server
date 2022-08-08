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

import { CreateEquipmentManualRequest } from '@app/equipment/equipment-manual/dtos/create-equipment-manual.request';
import { EquipmentManualProfileResponse } from '@app/equipment/equipment-manual/dtos/equipment-manual-profile.response';
import { UpdateEquipmentManualRequest } from '@app/equipment/equipment-manual/dtos/update-equipment-manual.request';
import { EquipmentManualService } from '@app/equipment/equipment-manual/equipment-manual.service';
import { Pagination } from '@infrastructure/types/pagination.types';

@Controller(':equipmentId/manuals')
export class EquipmentManualController {
  constructor(
    private readonly equipmentManualService: EquipmentManualService,
  ) {}

  @Get()
  async searchManual(
    @Param('equipmentId', ParseUUIDPipe) equipmentId: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ): Promise<Pagination<EquipmentManualProfileResponse>> {
    return this.equipmentManualService.searchManual(equipmentId, page, limit);
  }

  @Get(':manualId')
  async getManualProfile(
    @Param('equipmentId', ParseUUIDPipe) equipmentId: string,
    @Param('manualId', ParseUUIDPipe) manualId: string,
  ): Promise<EquipmentManualProfileResponse> {
    return this.equipmentManualService.getManualProfile(manualId);
  }

  @Post()
  async createManual(
    @Param('equipmentId', ParseUUIDPipe) equipmentId: string,
    @Body() data: CreateEquipmentManualRequest,
  ): Promise<EquipmentManualProfileResponse> {
    return this.equipmentManualService.createManual(equipmentId, data);
  }

  @Patch(':manualId')
  async updateManual(
    @Param('manualId', ParseUUIDPipe) manualId: string,
    @Param('equipmentId', ParseUUIDPipe) equipmentId: string,
    @Body() data: UpdateEquipmentManualRequest,
  ): Promise<EquipmentManualProfileResponse> {
    return this.equipmentManualService.updateManual(manualId, data);
  }

  @Delete(':manualId')
  async deleteManual(
    @Param('equipmentId', ParseUUIDPipe) equipmentId: string,
    @Param('manualId', ParseUUIDPipe) manualId: string,
  ): Promise<boolean> {
    return this.equipmentManualService.deleteManual(manualId);
  }
}
