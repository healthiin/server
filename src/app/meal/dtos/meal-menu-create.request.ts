import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { parse } from 'date-fns';

import { MealType } from '@domain/meal/meal';

export class MealMenuCreateRequest {
  @ApiProperty()
  @Transform(({ value }) => parse(value, 'yyyy-MM-dd', new Date()))
  @IsNotEmpty()
  @IsDate()
  date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ enum: MealType })
  @IsNotEmpty()
  @IsEnum(MealType)
  type: MealType;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  photoId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  carbohydrate: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  protein: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  fat: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  sodium: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  calories: number;
}
