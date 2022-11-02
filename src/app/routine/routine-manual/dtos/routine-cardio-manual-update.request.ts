import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

import { RoutineManualUpdateCommand } from '@app/routine/routine-manual/routine-manual.command';

export class RoutineCardioManualUpdateRequest
  implements Omit<RoutineManualUpdateCommand, 'routineManualId'>
{
  @IsOptional()
  @IsNumber()
  speed?: number;

  @IsOptional()
  @IsNumber()
  playMinute?: number;

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
