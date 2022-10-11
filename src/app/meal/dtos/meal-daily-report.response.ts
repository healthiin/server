import { ApiProperty } from '@nestjs/swagger';

import { MealMenuProfileResponse } from '@app/meal/dtos/meal-menu-profile.response';
import { MealType } from '@domain/meal/meal';

export class MealDailyStatisticsResponse {}

export class MealDailyReportResponse {
  @ApiProperty({ type: MealDailyStatisticsResponse })
  statistics: MealDailyStatisticsResponse;

  @ApiProperty()
  meals: {
    [MealType.BREAKFAST]: MealMenuProfileResponse[];
    [MealType.LUNCH]: MealMenuProfileResponse[];
    [MealType.DINNER]: MealMenuProfileResponse[];
    [MealType.SNACK]: MealMenuProfileResponse[];
  };

  constructor(meals: MealMenuProfileResponse[]) {
    this.statistics = {
      carbohydrate: meals.reduce((sum, { carbohydrate: val }) => sum + val, 0),
      protein: meals.reduce((sum, { protein: val }) => sum + val, 0),
      fat: meals.reduce((sum, { fat: val }) => sum + val, 0),
      sodium: meals.reduce((sum, { sodium: val }) => sum + val, 0),
      calories: meals.reduce((sum, { calories: val }) => sum + val, 0),
    };

    this.meals = {
      [MealType.BREAKFAST]: meals.filter(
        ({ type }) => type === MealType.BREAKFAST,
      ),
      [MealType.LUNCH]: meals.filter(({ type }) => type === MealType.LUNCH),
      [MealType.DINNER]: meals.filter(({ type }) => type === MealType.DINNER),
      [MealType.SNACK]: meals.filter(({ type }) => type === MealType.SNACK),
    };
  }
}
