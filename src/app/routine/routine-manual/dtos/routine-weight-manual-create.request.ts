import { IsNotEmpty, IsNumber } from 'class-validator';

import { RoutineWeightManualCreateCommand } from '@app/routine/routine-manual/routine-manual.command';

export class RoutineWeightManualCreateRequest
  implements Omit<RoutineWeightManualCreateCommand, 'manualId'>
{
  @IsNotEmpty()
  @IsNumber()
  targetNumber: number;

  @IsNotEmpty()
  @IsNumber()
  setNumber: number;

  @IsNotEmpty()
  @IsNumber()
  weight: number;

  @IsNotEmpty()
  @IsNumber()
  order: number;
}
