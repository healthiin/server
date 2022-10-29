import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

import { MyRoutineCreateCommand } from '@app/routine/routine-core/routine.command';

export class MyRoutineCreateRequest
  implements Pick<MyRoutineCreateCommand, 'title' | 'days'>
{
  @ApiProperty({
    type: String,
    description: '루틴 제목',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    type: [Number],
    description: '루틴 요일',
    example: [1, 0, 1, 0, 0, 0, 0],
  })
  @IsNotEmpty()
  @IsArray()
  days: number[];
}
