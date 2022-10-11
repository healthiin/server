import { IsNumber, IsOptional } from 'class-validator';

import { RoutineManualUpdateCommand } from '@app/routine/routine-manual/routine-manual.command';

export class RoutineWeightManualUpdateRequest
  implements Omit<RoutineManualUpdateCommand, 'manualId' | 'routineManualId'>
{
  @IsOptional()
  @IsNumber()
  targetNumber?: number;

  @IsOptional()
  @IsNumber()
  setNumber?: number;

  @IsOptional()
  @IsNumber()
  weight?: number;

  @IsOptional()
  @IsNumber()
  order?: number;
}