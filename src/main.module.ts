import { Module } from '@nestjs/common';
import { EquipmentsModule } from './equipments/equipments.module';
import { UserModule } from './user/user.module';
import { AppModule } from './app/app.module';

@Module({
  imports: [EquipmentsModule, UserModule, AppModule],
})
export class MainModule {}
