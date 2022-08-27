import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateManualRequest {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;
}
