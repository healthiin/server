import { Module } from '@nestjs/common';

import { AuthModule } from '@app/auth/auth.module';
import { CommunityModule } from '@app/community/community.module';
import { EquipmentModule } from '@app/equipment/equipment.module';
import { GymModule } from '@app/gym/gym.module';
import { MealModule } from '@app/meal/meal.module';
import { RoutineModule } from '@app/routine/routine.module';
import { UserModule } from '@app/user/user.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    CommunityModule,
    GymModule,
    EquipmentModule,
    RoutineModule,
    MealModule,
  ],
})
export class AppModule {}
