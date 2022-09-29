import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { ManualType } from '@app/equipment/equipment-manual/dtos/manual-create.request';
import { ManualUpdateCommand } from '@app/equipment/equipment-manual/equipment-manual.command';

export class ManualUpdateRequest
  implements Omit<ManualUpdateCommand, 'manualId'>
{
  @ApiProperty({ description: '운동 명' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ description: '운동 영명' })
  @IsOptional()
  @IsString()
  enTitle?: string;

  @ApiProperty({ description: '운동 부위' })
  @IsOptional()
  @IsString()
  type?: ManualType;

  @ApiProperty({ description: '운동에 대한 설명' })
  @IsOptional()
  @IsString()
  equipmentId?: string;
}
