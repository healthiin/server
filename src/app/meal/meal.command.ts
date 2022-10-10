import { MealType } from '@domain/meal/meal';

export type BaseMealData = {
  userId: string;
  date: Date;
  type: MealType;
  title: string;
  photoId: string;
};

export type MealIngredients = {
  carbohydrate: number;
  protein: number;
  fat: number;
  sodium: number;
  calories: number;
};

export type CreateMealData = BaseMealData & MealIngredients;

export type UpdateMealData = Partial<CreateMealData>;
