import { MealType } from '@domain/meal/meal';

export type CreateMealData = {
  userId: string;
  date: Date;
  title: string;
  type: MealType;
  photoId: string;
  carbohydrate: number;
  protein: number;
  fat: number;
  sodium: number;
  calories: number;
};
