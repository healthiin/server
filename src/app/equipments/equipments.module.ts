import { Module } from '@nestjs/common';
<<<<<<< HEAD

@Module({})
=======
import { EquipmentsService } from './equipments.service';
import { EquipmentsController } from './equipments.controller';

@Module({
  providers: [EquipmentsService],
  controllers: [EquipmentsController],
})
>>>>>>> f8d167fd319c6c6b52adbf98a72f6d4cb13689a8
export class EquipmentsModule {}
