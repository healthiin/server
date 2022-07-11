import { Module } from '@nestjs/common';
import { EquipmentsModule } from './equipments/equipments.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [EquipmentsModule, UserModule]
})
export class AppModule {}
