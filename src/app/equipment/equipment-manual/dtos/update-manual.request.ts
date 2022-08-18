import { IsOptional, IsString } from 'class-validator';

export class UpdateManualRequest {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
