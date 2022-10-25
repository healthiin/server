import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { RoutineCreateCommand } from '@app/routine/routine-core/routine.command';

export class RoutineCreateRequest
  implements Omit<RoutineCreateCommand, 'routineId' | 'userId'>
{
  @ApiProperty({ description: '루틴 이름' })
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiProperty({ description: '루틴 설명' })
  @IsNotEmpty()
  @IsString()
  description!: string;

  @ApiProperty({
    description: '해당 루틴 진행할 요일',
    example: [1, 1, 0, 0, 0, 0, 0],
  })
  @IsNotEmpty()
  @IsNumber({}, { each: true })
  days!: number[];
}
