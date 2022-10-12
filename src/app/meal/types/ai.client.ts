import { MealInspectResult } from '@app/meal/dtos/meal-inspect-result';

export interface AiClient {
  getIngredients(photo: Buffer, photoId: string): Promise<MealInspectResult[]>;
}
