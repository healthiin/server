import { IsNotEmpty, IsString } from 'class-validator';

import { RoutineCreateCommand } from '@app/routine/routine-core/routine.command';

export class RoutineCreateRequest
  implements Omit<RoutineCreateCommand, 'routineId' | 'manualIds' | 'userId'>
{
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  manualIds: string[];
}
