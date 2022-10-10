import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateMealData } from '@app/meal/commands/create-meal.data';
import { InspectResultData } from '@app/meal/commands/inspect-result.data';
import { MealAiClient } from '@app/meal/utils/meal-ai.client';
import { MealPhotoClient } from '@app/meal/utils/meal-photo.client';
import { Meal } from '@domain/meal/meal.entity';

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
}
