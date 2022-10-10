import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { InspectResultData } from '@app/meal/commands/inspect-result.data';
import { CreateMealData, UpdateMealData } from '@app/meal/meal.command';
import { MealAiClient } from '@app/meal/utils/meal-ai.client';
import { MealPhotoClient } from '@app/meal/utils/meal-photo.client';
import { Meal } from '@domain/meal/meal.entity';
import { MealNotFoundException } from '@domain/meal/meal.errors';

@Injectable()
export class MealService {
  constructor(
    @Inject('MealAiClient')
    private readonly mealAiClient: MealAiClient,
    @Inject('MealPhotoClient')
    private readonly mealPhotoClient: MealPhotoClient,
    @InjectRepository(Meal)
    private readonly mealRepository: Repository<Meal>,
  ) {}

  async inspectIngredients(
    userId: string,
    photo: Buffer,
  ): Promise<InspectResultData> {
    const resizedPhoto = await this.mealPhotoClient.resizePhoto(photo);
    const photoId = await this.mealPhotoClient.uploadPhoto(resizedPhoto);

    const results = await this.mealAiClient.getIngredients(
      resizedPhoto,
      photoId,
    );

    return { photoId, results: results.slice(0, 3) };
  }

  async getMealMenu(id: string): Promise<Meal> {
    const meal = await this.mealRepository.findOne({
      where: { id },
    });

    if (!meal) throw new MealNotFoundException();

    return meal;
  }

  async createMealMenu(data: CreateMealData): Promise<Meal> {
    return this.mealRepository.save({
      title: data.title,
      type: data.type,
      date: data.date,
      photoId: data.photoId,
      user: { id: data.userId },
      nutrients: {
        sodium: data.sodium,
        protein: data.protein,
        fat: data.fat,
        carbohydrate: data.carbohydrate,
        calories: data.calories,
      },
    });
  }

  async updateMealMenu(id: string, data: UpdateMealData): Promise<Meal> {
    const meal = await this.getMealMenu(id);

    const { title, ...nutrients } = data;
    return this.mealRepository.save({
      ...meal,
      title: title || meal.title,
      nutrients: {
        ...meal.nutrients,
        ...nutrients,
      },
    });
  }

  async deleteMealMenu(id: string): Promise<boolean> {
    const meal = await this.getMealMenu(id);

    const { affected } = await this.mealRepository.delete({ id: meal.id });

    return affected > 0;
  }
}
