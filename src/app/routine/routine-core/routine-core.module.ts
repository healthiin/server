import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthorizationModule } from '@app/auth/authorization/authorization.module';
import { RoutineCoreController } from '@app/routine/routine-core/routine-core.controller';
import { RoutineCoreService } from '@app/routine/routine-core/routine-core.service';
import { Manual } from '@domain/equipment/equipment-manual.entity';
import { Routine } from '@domain/routine/routine.entity';
import { User } from '@domain/user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Routine, User, Manual]),
    AuthorizationModule,
  ],
  controllers: [RoutineCoreController],
  providers: [RoutineCoreService],
})
export class RoutineCoreModule {}
