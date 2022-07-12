import { EquipmentsService } from './equipments.service';
import { EquipmentsController } from './equipments.controller';
import { Module } from '@nestjs/common';

@Module({
  providers: [EquipmentsService],
  controllers: [EquipmentsController],
})
export class EquipmentsModule {}
