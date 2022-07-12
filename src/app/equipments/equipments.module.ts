
import { EquipmentsService } from './equipments.service';
import { EquipmentsController } from './equipments.controller';

@Module({
  providers: [EquipmentsService],
  controllers: [EquipmentsController],
})
export class EquipmentsModule {}
