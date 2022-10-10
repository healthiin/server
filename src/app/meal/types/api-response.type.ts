type ServingSize = {
  unit: string;
  servingWeight: number;
};

type Nutrition = {
  totalCarbs: number;
  totalFat: number;
  calcium: number;
  potassium: number;
  sugars: number;
  vitaminC: number;
  calories: number;
  polyunsaturatedFat: number;
  saturatedFat: number;
  sodium: number;
  dietaryFiber: number;
  monounsaturatedFat: number;
  protein: number;
  cholesterol: number;
  iron: number;
  vitaminA: number;
  transFat?: number;
};

export type FoodItem = {
  servingSizes: ServingSize[];
  score: number;
  nutrition: Nutrition;
  name: string;
  food_id: string;
  group: string;
  generic?: boolean;
};

export type FoodAiResponse = {
  is_food: boolean;
  results: {
    items: FoodItem[];
    group: string;
  }[];
};
