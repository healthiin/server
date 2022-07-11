import { Module } from '@nestjs/common';
import { EquipmentsService } from './equipments.service';
import { EquipmentsController } from './equipments.controller';

@Module({
  controllers: [EquipmentsController],
  providers: [EquipmentsService]
})
export class EquipmentsModule {}
