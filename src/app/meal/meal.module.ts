import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MealController } from '@app/meal/meal.controller';
import { MealService } from '@app/meal/meal.service';
import { MealAiClient } from '@app/meal/utils/meal-ai.client';
import { MealPhotoClient } from '@app/meal/utils/meal-photo.client';
import { Meal } from '@domain/meal/meal.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Meal]),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        baseURL: 'https://api-2445582032290.production.gw.apicast.io/v1',
        params: {
          user_key: configService.get<string>('FOOD_API_KEY'),
        },
        validateStatus: () => true,
      }),
    }),
  ],
  controllers: [MealController],
  providers: [
    MealService,
    {
      provide: 'MealAiClient',
      useClass: MealAiClient,
    },
    {
      provide: 'MealPhotoClient',
      useClass: MealPhotoClient,
    },
  ],
})
export class MealModule {}
