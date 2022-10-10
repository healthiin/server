import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class MealMenuUpdateRequest {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  carbohydrate?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  protein?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  fat?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  sodium?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  calories?: number;
}
