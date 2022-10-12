import { IsNotEmpty, IsNumber } from 'class-validator';

import { RoutineCardioManualCreateCommand } from '@app/routine/routine-manual/routine-manual.command';

export class RoutineCardioManualCreateRequest
  implements Omit<RoutineCardioManualCreateCommand, 'manualId'>
{
  @IsNotEmpty()
  @IsNumber()
  speed: number;

  @IsNotEmpty()
  @IsNumber()
  playMinute: number;

  @IsNotEmpty()
  @IsNumber()
  order: number;
}
