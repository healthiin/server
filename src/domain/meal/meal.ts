export enum MealType {
  BREAKFAST = 'breakfast',
  LUNCH = 'lunch',
  DINNER = 'dinner',
  SNACK = 'snack',
}

export type MealNutrients = {
  carbohydrate: number;
  protein: number;
  fat: number;
  calories: number;
  sodium: number;
};

export type MealProperties = {
  id: string;
  title: string;
  nutrients: MealNutrients;
  type: MealType;
  photoId: string;
  createdAt: Date;
  updatedAt: Date;
};
