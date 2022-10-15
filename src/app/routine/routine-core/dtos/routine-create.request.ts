import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { RoutineCreateCommand } from '@app/routine/routine-core/routine.command';

export class RoutineCreateRequest
  implements Omit<RoutineCreateCommand, 'routineId' | 'userId'>
{
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsString()
  description!: string;

  @IsNotEmpty()
  @IsNumber({}, { each: true })
  days!: number[];

  @IsNotEmpty()
  @IsString({ each: true })
  routineManualIds!: string[];
}
