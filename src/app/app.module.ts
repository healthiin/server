<<<<<<< HEAD
import { Module } from '@nestjs/common';
import { EquipmentsModule } from './equipments/equipments.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [EquipmentsModule, UserModule]
=======
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { EquipmentsModule } from './equipments/equipments.module';

@Module({
  imports: [UserModule, EquipmentsModule],
>>>>>>> f8d167fd319c6c6b52adbf98a72f6d4cb13689a8
})
export class AppModule {}
