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
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { EquipmentCreateRequest } from '@app/equipment/equipment-core/dtos/equipment-create.request';
import { EquipmentProfileResponse } from '@app/equipment/equipment-core/dtos/equipment-profile.response';
import { EquipmentUpdateRequest } from '@app/equipment/equipment-core/dtos/equipment-update.request';
import { EquipmentCoreService } from '@app/equipment/equipment-core/equipment-core.service';

@Controller('equipments')
@ApiTags('[운동 기구] 기구')
export class EquipmentCoreController {
  constructor(private readonly equipmentCoreService: EquipmentCoreService) {}

  @Get()
  @ApiOperation({ summary: '기구 목록을 조회합니다' })
  @ApiOkResponse({ type: [EquipmentProfileResponse] })
  async getEquipments(): Promise<EquipmentProfileResponse[]> {
    return await this.equipmentCoreService.getEquipments();
  }

  @Get(':id')
  @ApiOperation({ summary: '특정 기구에 대한 정보를 조회합니다' })
  @ApiOkResponse({ type: EquipmentProfileResponse })
  async getEquipment(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<EquipmentProfileResponse> {
    const equipment = await this.equipmentCoreService.getEquipmentById(id);
    return new EquipmentProfileResponse(equipment);
  }

  @Post()
  @ApiOperation({ summary: '기구를 생성합니다' })
  @ApiOkResponse({ type: EquipmentProfileResponse })
  async createEquipment(
    @Body() data: EquipmentCreateRequest,
  ): Promise<EquipmentProfileResponse> {
    const equipment = await this.equipmentCoreService.createEquipment(data);
    return new EquipmentProfileResponse(equipment);
  }

  @Patch(':id')
  @ApiOperation({ summary: '기구를 수정합니다' })
  @ApiOkResponse({ type: EquipmentProfileResponse })
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
  @ApiOperation({ summary: '기구를 삭제합니다' })
  @ApiOkResponse({ type: Boolean })
  async deleteEquipment(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<boolean> {
    return await this.equipmentCoreService.deleteEquipment({ equipmentId: id });
  }
}
