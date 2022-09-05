import { Module } from '@nestjs/common';

import { AuthModule } from '@app/auth/auth.module';
import { CommunityModule } from '@app/community/community.module';
import { EquipmentModule } from '@app/equipment/equipment.module';
import { GymModule } from '@app/gym/gym.module';
import { ManualModule } from '@app/manual/manual.module';
import { RoutineModule } from '@app/routine/routine.module';
import { UserModule } from '@app/user/user.module';

@Module({
  imports: [
    ManualModule,
    AuthModule,
    UserModule,
    CommunityModule,
    GymModule,
    EquipmentModule,
    RoutineModule,
  ],
})
export class AppModule {}
