import { IsNotEmpty, IsString } from 'class-validator';

import { RoutineCreateCommand } from '@app/routine/routine.command';

export class RoutineCreateRequest
  implements Omit<RoutineCreateCommand, 'routineId'>
{
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
