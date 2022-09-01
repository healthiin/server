import { IsOptional, IsString } from 'class-validator';

export class RoutineUpdateRequest {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
