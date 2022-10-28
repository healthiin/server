import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { RoutineCreateCommand } from '@app/routine/routine-core/routine.command';

export class ReferenceRoutineCreateRequest
  implements Omit<RoutineCreateCommand, 'routineId' | 'userId'>
{
  @ApiProperty({ description: '루틴 이름', example: '헬스 루틴' })
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiProperty({ description: '루틴 설명', example: '루틴 설명' })
  @IsNotEmpty()
  @IsString()
  description!: string;
}
