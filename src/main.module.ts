import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { EquipmentsModule } from './equipments/equipments.module';
import { UserModule } from './user/user.module';
import { AppModule } from './app/app.module';

@Module({
  imports: [EquipmentsModule, UserModule, AppModule],
=======
import { AppModule } from './app/app.module';

@Module({
  imports: [AppModule],
>>>>>>> f8d167fd319c6c6b52adbf98a72f6d4cb13689a8
})
export class MainModule {}
