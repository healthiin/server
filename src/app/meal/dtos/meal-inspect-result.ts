import { ApiProperty } from '@nestjs/swagger';

import { FoodItem } from '@app/meal/types/api-response.type';

export class MealInspectResult {
  @ApiProperty({ description: '예측 음식명' })
  name: string;

  @ApiProperty({ description: '탄수화물', nullable: true })
  carbohydrate!: number;

  @ApiProperty({ description: '단백질', nullable: true })
  protein!: number;

  @ApiProperty({ description: '지방', nullable: true })
  fat!: number;

  @ApiProperty({ description: '나트륨', nullable: true })
  sodium!: number;

  @ApiProperty({ description: '칼로리', nullable: true })
  calories!: number;

  constructor(food: FoodItem) {
    this.name = food.name;
    this.carbohydrate = food.nutrition.totalCarbs || null;
    this.protein = food.nutrition.protein || null;
    this.fat = food.nutrition.totalFat || null;
    this.sodium = food.nutrition.sodium || null;
    this.calories = food.nutrition.calories || null;
  }
}
