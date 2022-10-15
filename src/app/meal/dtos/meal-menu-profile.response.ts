import { ApiProperty } from '@nestjs/swagger';

import { MealType } from '@domain/meal/meal';
import { Meal } from '@domain/meal/meal.entity';

export class MealMenuProfileResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  title: string;

  @ApiProperty({ enum: MealType })
  type: MealType;

  @ApiProperty()
  photoId: string;

  @ApiProperty()
  carbohydrate: number;

  @ApiProperty()
  protein: number;

  @ApiProperty()
  fat: number;

  @ApiProperty()
  sodium: number;

  @ApiProperty()
  calories: number;

  constructor(meal: Meal) {
    this.id = meal.id;
    this.date = meal.date;
    this.title = meal.title;
    this.type = meal.type;
    this.photoId = meal.photoId;
    this.carbohydrate = meal.nutrients.carbohydrate;
    this.protein = meal.nutrients.protein;
    this.fat = meal.nutrients.fat;
    this.sodium = meal.nutrients.sodium;
    this.calories = meal.nutrients.calories;
  }
}
