import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { EquipmentsModule } from './equipments/equipments.module';

@Module({
  imports: [UserModule, EquipmentsModule],
})
export class AppModule {}
