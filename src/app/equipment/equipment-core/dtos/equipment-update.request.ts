import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { EquipmentUpdateCommand } from '@app/equipment/equipment-core/equipment-core.command';

export class EquipmentUpdateRequest
  implements Omit<EquipmentUpdateCommand, 'equipmentId'>
{
  @ApiProperty({ description: '기구명' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: '기구 영어명' })
  @IsOptional()
  @IsString()
  enName?: string;

  @ApiProperty({ description: '기구에 대한 설명' })
  @IsOptional()
  @IsString()
  description?: string;
}
