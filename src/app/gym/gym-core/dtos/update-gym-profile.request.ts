import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateGymProfileRequest {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  location?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  contact?: string | null;
}
