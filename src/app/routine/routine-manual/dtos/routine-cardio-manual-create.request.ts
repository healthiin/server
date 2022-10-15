import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

import { RoutineCardioManualCreateCommand } from '@app/routine/routine-manual/routine-manual.command';

export class RoutineCardioManualCreateRequest
  implements Omit<RoutineCardioManualCreateCommand, 'manualId'>
{
  @ApiProperty({ description: '운동 속도', example: 10 })
  @IsNotEmpty()
  @IsNumber()
  speed: number;

  @ApiProperty({ description: '운동 시간(분)', example: 20 })
  @IsNotEmpty()
  @IsNumber()
  playMinute: number;

  @ApiProperty({ description: '운동 순서', example: 3 })
  @IsNotEmpty()
  @IsNumber()
  order: number;
}
