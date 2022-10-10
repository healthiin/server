import { Inject, Injectable } from '@nestjs/common';

import { InspectResultData } from '@app/meal/commands/inspect-result.data';
import { MealAiClient } from '@app/meal/utils/meal-ai.client';
import { MealPhotoClient } from '@app/meal/utils/meal-photo.client';

@Injectable()
export class MealService {
  constructor(
    @Inject('MealAiClient')
    private readonly mealAiClient: MealAiClient,
    @Inject('MealPhotoClient')
    private readonly mealPhotoClient: MealPhotoClient,
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
}
