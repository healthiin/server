import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { ManualCreateCommand } from '@app/equipment/equipment-manual/equipment-manual.command';

export enum ManualType {
  back = '등',
  shoulder = '어깨',
  chest = '가슴',
  arm = '팔',
  legs = '다리',
  abs = '복근',
  aerobic = '유산소',
  etc = '기타',
}

export class ManualCreateRequest implements ManualCreateCommand {
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
  @IsEnum(ManualType)
  type!: ManualType;

  @ApiProperty({ description: '운동에 대한 설명' })
  @IsNotEmpty()
  @IsString()
  description!: string;

  @ApiProperty({ description: '운동에 대한 주의사항' })
  @IsNotEmpty()
  @IsString()
  precautions!: string;
}
