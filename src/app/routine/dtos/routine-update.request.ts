import { IsOptional, IsString } from 'class-validator';

import { RoutineUpdateCommand } from '@app/routine/routine.command';

export class RoutineUpdateRequest
  implements Omit<RoutineUpdateCommand, 'userId' | 'routineId' | 'manuals'>
{
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  manuals?: string[];
}
