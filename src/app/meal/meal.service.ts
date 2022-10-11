import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { parse } from 'date-fns';
import { Repository } from 'typeorm';

import { InspectResultData } from '@app/meal/commands/inspect-result.data';
import { MealDailyReportResponse } from '@app/meal/dtos/meal-daily-report.response';
import { MealMenuProfileResponse } from '@app/meal/dtos/meal-menu-profile.response';
import { CreateMealData, UpdateMealData } from '@app/meal/meal.command';
import { AiClient } from '@app/meal/types/ai.client';
import { PhotoClient } from '@app/meal/types/photo.client';
import { Meal } from '@domain/meal/meal.entity';
import { MealNotFoundException } from '@domain/meal/meal.errors';

@Injectable()
export class MealService {
  constructor(
    @Inject('MealAiClient')
    private readonly mealAiClient: AiClient,
    @Inject('MealPhotoClient')
    private readonly mealPhotoClient: PhotoClient,
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

  async getDailyMeal(
    date: string,
    userId: string,
  ): Promise<MealDailyReportResponse> {
    const parsedDate = parse(date, 'yyyy-MM-dd', new Date());

    const meals = await this.mealRepository.find({
      where: {
        date: parsedDate,
        user: { id: userId },
      },
    });

    return new MealDailyReportResponse(
      meals.map((meal) => new MealMenuProfileResponse(meal)),
    );
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
