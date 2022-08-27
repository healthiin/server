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

  @Get('/:id')
  async getManualById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ManualResponse> {
    return this.manualService.getManualById(id);
  }

  @Get('category/:category')
  async getManualsByType(
    @Param('category')
    type: 'back' | 'shoulder' | 'chest' | 'arm' | 'lef' | 'abs',
  ): Promise<ManualPreviewResponse[]> {
    return this.manualService.getManualsByType(type);
  }

  @Post()
  async createManual(
    @Body() manualCreateRequest: ManualCreateRequest,
  ): Promise<string> {
    return this.manualService.createManual(manualCreateRequest);
  }

  @Patch('/:id')
  async updateManual(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() manualCreateRequest: ManualCreateRequest,
  ): Promise<string> {
    return this.manualService.updateManual(id, manualCreateRequest);
  }

  @Delete('/:id')
  async withdrawManual(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<boolean> {
    return this.manualService.withdrawManual(id);
  }
}
