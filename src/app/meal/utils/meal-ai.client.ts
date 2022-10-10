import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as FormData from 'form-data';

import { MealInspectResult } from '@app/meal/dtos/meal-inspect-result';
import { AiClient } from '@app/meal/types/ai.client';
import { FoodAiResponse } from '@app/meal/types/api-response.type';

@Injectable()
export class MealAiClient implements AiClient {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async getIngredients(
    photo: Buffer,
    photoId: string,
  ): Promise<MealInspectResult[]> {
    const formData = new FormData();
    formData.append('file', photo, photoId);

    const { data, status } =
      await this.httpService.axiosRef.request<FoodAiResponse>({
        method: 'POST',
        url: `foodrecognition/full`,
        data: formData,
      });

    if (status !== 200) throw new Error('FOOD_AI_ERROR');

    return data.results
      .map(({ items }) => items.map((item) => new MealInspectResult(item)))
      .flat();
  }
}
