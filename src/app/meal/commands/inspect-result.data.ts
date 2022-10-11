import { MealInspectResult } from '@app/meal/dtos/meal-inspect-result';

export type InspectResultData = {
  photoId: string;
  results: MealInspectResult[];
};
