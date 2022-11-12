import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

import { MealNutrients } from '@domain/meal/meal';
import { Meal } from '@domain/meal/meal.entity';

export type ReportMealStatistics = {
  carbohydrate: number;
  protein: number;
  fat: number;
};

export class ReportMealResponse {
  @ApiProperty({ description: '기록 ID' })
  id: string;

  @ApiProperty({ description: '식단 종류' })
  type: string;

  @ApiProperty({ description: '식단 명' })
  title: string;

  @ApiProperty({ description: '칼로리' })
  calories: number;

  @ApiProperty({ description: '사진' })
  photoId: string;

  @Exclude()
  day: number;

  @Exclude()
  nutrients: MealNutrients;

  constructor(data: Meal) {
    this.id = data.id;
    this.type = data.type;
    this.title = data.title;
    this.calories = data.nutrients.calories;
    this.nutrients = data.nutrients;
    this.photoId = data.photoId;
    this.day = data.createdAt.getDate();
  }
}
