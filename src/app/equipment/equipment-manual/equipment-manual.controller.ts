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

import { ManualCreateRequest } from '@app/equipment/equipment-manual/dtos/manual-create.request';
import { ManualProfileResponse } from '@app/equipment/equipment-manual/dtos/manual-profile.response';
import { ManualUpdateRequest } from '@app/equipment/equipment-manual/dtos/manual-update.request';
import { EquipmentManualService } from '@app/equipment/equipment-manual/equipment-manual.service';

@Controller('manuals')
export class EquipmentManualController {
  constructor(private readonly manualService: EquipmentManualService) {}

  @Get()
  async getAllManuals(): Promise<ManualProfileResponse[]> {
    return this.manualService.getAllManuals();
  }

  @Get('/:manualId')
  async getManualById(
    @Param('manualId', ParseUUIDPipe) manualId: string,
  ): Promise<ManualProfileResponse> {
    return this.manualService.getManualById(manualId);
  }

  @Get('category/:category')
  async getManualsByType(
    @Param('category')
    type: 'back' | 'shoulder' | 'chest' | 'arm' | 'lef' | 'abs',
  ): Promise<ManualProfileResponse[]> {
    return this.manualService.getManualsByType(type);
  }

  @Post('/:equipmentId')
  async createManual(
    @Param('equipmentId', ParseUUIDPipe) equipmentId: string,
    @Body() data: ManualCreateRequest,
  ): Promise<ManualProfileResponse> {
    const manual = await this.manualService.createManual({
      equipmentId,
      ...data,
    });
    return new ManualProfileResponse(manual);
  }

  @Patch('/:manualId')
  async updateManual(
    @Param('manualId', ParseUUIDPipe) manualId: string,
    @Body() data: ManualUpdateRequest,
  ): Promise<ManualProfileResponse> {
    const manual = await this.manualService.updateManual({
      manualId,
      ...data,
    });

    return new ManualProfileResponse(manual);
  }

  @Delete('/:manualId')
  async withdrawManual(
    @Param('manualId', ParseUUIDPipe) manualId: string,
  ): Promise<boolean> {
    return this.manualService.withdrawManual({ manualId });
  }
}
