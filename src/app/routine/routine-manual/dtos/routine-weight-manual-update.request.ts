import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

import { RoutineManualUpdateCommand } from '@app/routine/routine-manual/routine-manual.command';

export class RoutineWeightManualUpdateRequest
  implements Omit<RoutineManualUpdateCommand, 'routineManualId'>
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

  @IsOptional()
  @IsString()
  manualId?: string;

  @IsOptional()
  @IsArray()
  days?: Array<number>;
}
