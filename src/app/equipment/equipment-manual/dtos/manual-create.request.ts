import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { ManualCreateCommand } from '@app/equipment/equipment-manual/equipment-manual.command';
import { ManualType } from '@domain/equipment/equipment-type';

export class ManualCreateRequest
  implements Omit<ManualCreateCommand, 'equipmentId'>
{
  @ApiProperty({ description: '운동 명' })
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiProperty({ description: '운동 영명' })
  @IsNotEmpty()
  @IsString()
  enTitle!: string;

  @ApiProperty({ description: '운동에 대한 설명' })
  @IsNotEmpty()
  @IsString()
  description!: string;

  @ApiProperty({ description: '운동에 대한 주의사항' })
  @IsOptional()
  @IsString()
  precaution!: string | null;

  @ApiProperty({ description: '운동에 대한 이미지' })
  @IsOptional()
  @IsString()
  imageUrl!: string | null;

  @ApiProperty({ description: '운동에 대한 동영상' })
  @IsOptional()
  @IsString()
  videoUrl!: string | null;

  @ApiProperty({ description: '운동 부위' })
  @IsNotEmpty()
  @IsString()
  type!: ManualType;
}
