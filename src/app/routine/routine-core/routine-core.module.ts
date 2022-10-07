import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthorizationModule } from '@app/auth/authorization/authorization.module';
import { RoutineCoreController } from '@app/routine/routine-core/routine-core.controller';
import { RoutineCoreService } from '@app/routine/routine-core/routine-core.service';
import { UserModule } from '@app/user/user.module';
import { Manual } from '@domain/equipment/equipment-manual.entity';
import { Routine } from '@domain/routine/routine.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Routine, Manual]),
    AuthorizationModule,
    UserModule,
  ],
  controllers: [RoutineCoreController],
  providers: [RoutineCoreService],
})
export class RoutineCoreModule {}
