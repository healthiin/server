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

import { ManualCreateRequest } from '@app/manual/dtos/manual-create.request';
import { ManualPreviewResponse } from '@app/manual/dtos/manual-preview.response';
import { ManualResponse } from '@app/manual/dtos/manual.response';
import { ManualService } from '@app/manual/manual.service';

@Controller('manuals')
export class ManualController {
  constructor(private readonly manualService: ManualService) {}

  @Get()
  async getAllManuals(): Promise<ManualPreviewResponse[]> {
    return this.manualService.getAllManuals();
  }

  @Get('/:manualId')
  async getManualById(
    @Param('manualId', ParseUUIDPipe) manualId: string,
  ): Promise<ManualResponse> {
    return this.manualService.getManualById(manualId);
  }

  @Get('category/:category')
  async getManualsByType(
    @Param('category')
    type: 'back' | 'shoulder' | 'chest' | 'arm' | 'lef' | 'abs',
  ): Promise<ManualPreviewResponse[]> {
    return this.manualService.getManualsByType(type);
  }

  @Post(':/equipmentId')
  async createManual(
    @Param('equipmentId', ParseUUIDPipe) equipmentId: string,
    @Body() manualCreateRequest: ManualCreateRequest,
  ): Promise<string> {
    return this.manualService.createManual(equipmentId, manualCreateRequest);
  }

  @Patch('/:manualId')
  async updateManual(
    @Param('manualId', ParseUUIDPipe) manualId: string,
    @Body() manualCreateRequest: ManualCreateRequest,
  ): Promise<string> {
    return this.manualService.updateManual(manualId, manualCreateRequest);
  }

  @Delete('/:manualId')
  async withdrawManual(
    @Param('manualId', ParseUUIDPipe) manualId: string,
  ): Promise<boolean> {
    return this.manualService.withdrawManual(manualId);
  }
}
