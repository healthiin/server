import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { EquipmentCreateCommand } from '@app/equipment/equipment-core/equipment-core.command';

export class EquipmentCreateRequest implements EquipmentCreateCommand {
  @ApiProperty({ example: '기구명' })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({ example: '기구 영어명' })
  @IsNotEmpty()
  @IsString()
  enName!: string;

  @ApiProperty({ example: '기구에 대한 설명' })
  @IsNotEmpty()
  @IsString()
  description!: string;
}
