import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

import { RoutineUpdateCommand } from '@app/routine/routine-core/routine.command';

export class RoutineUpdateRequest
  implements Omit<RoutineUpdateCommand, 'userId' | 'routineId'>
{
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    type: String,
    description: '루틴 제목',
    example: '헬스 루틴',
  })
  title?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    type: String,
    description: '업데이트 된 루틴 설명',
    example: '업데이트 된 루틴 설명',
  })
  description?: string;

  @IsOptional()
  @IsArray()
  @ApiPropertyOptional({
    type: [Number],
    example: [1, 0, 1, 0, 0, 0, 0],
  })
  days: number[];
}
