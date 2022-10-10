import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { FoodAiResponse } from '@app/meal/types/api-response.type';

@Injectable()
export class MealAiClient {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async getIngredients(photo: Blob): Promise<FoodAiResponse> {
    const formData = new FormData();
    formData.set('file', photo);

    const { data, status } =
      await this.httpService.axiosRef.request<FoodAiResponse>({
        url: `foodrecognition/full`,
        data: formData,
      });

    if (status !== 200) throw new Error('FOOD_AI_ERROR');

    return data;
  }
}
