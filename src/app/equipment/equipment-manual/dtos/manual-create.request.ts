import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { ManualCreateCommand } from '@app/equipment/equipment-manual/equipment-manual.command';

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

  @ApiProperty({ description: '운동 부위' })
  @IsNotEmpty()
  @IsString()
  type!: 'back' | 'shoulder' | 'chest' | 'arm' | 'lef' | 'abs';

  @ApiProperty({ description: '운동에 대한 설명' })
  @IsNotEmpty()
  @IsString()
  description!: string;
}
