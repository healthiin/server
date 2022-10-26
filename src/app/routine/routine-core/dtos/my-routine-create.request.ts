import { IsArray, IsNotEmpty, IsString } from 'class-validator';

import { MyRoutineCreateCommand } from '@app/routine/routine-core/routine.command';

export class MyRoutineCreateRequest
  implements Pick<MyRoutineCreateCommand, 'title' | 'days'>
{
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsArray({ each: true })
  days: number[];
}
