import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

import { RoutineWeightManualCreateCommand } from '@app/routine/routine-manual/routine-manual.command';

export class RoutineWeightManualCreateRequest
  implements Omit<RoutineWeightManualCreateCommand, 'manualId'>
{
  @ApiProperty({ description: '각 세트당 목표 횟수', example: 10 })
  @IsNotEmpty()
  @IsNumber()
  targetNumber: number;

  @ApiProperty({ description: '세트 수', example: 3 })
  @IsNotEmpty()
  @IsNumber()
  setNumber: number;

  @ApiProperty({ description: '무게', example: 3 })
  @IsNotEmpty()
  @IsNumber()
  weight: number;

  @ApiProperty({ description: '운동 순서', example: 3 })
  @IsNotEmpty()
  @IsNumber()
  order: number;
}
