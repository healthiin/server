import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { GymUpdateCommand } from '@app/gym/gym-core/gym-core.command';

export class UpdateGymProfileRequest implements GymUpdateCommand {
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
