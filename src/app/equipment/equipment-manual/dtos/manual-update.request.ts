import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { ManualUpdateCommand } from '@app/equipment/equipment-manual/equipment-manual.command';
import { ManualType } from '@domain/equipment/equipment-type';

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

  @ApiProperty({ description: '운동에 대한 설명' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: '운동에 대한 주의사항' })
  @IsOptional()
  @IsString()
  precaution?: string;

  @ApiProperty({ description: '운동 부위' })
  @IsOptional()
  @IsString()
  type?: ManualType;

  @ApiProperty({ description: '운동에 대한 이미지' })
  @IsOptional()
  @IsString()
  imageUrl: string;

  @ApiProperty({ description: '운동에 대한 동영상' })
  @IsOptional()
  @IsString()
  videoUrl: string;

  @ApiProperty({ description: '운동에 대한 설명' })
  @IsOptional()
  @IsString()
  equipmentId?: string;
}
