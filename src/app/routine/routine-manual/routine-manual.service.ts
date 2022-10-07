import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';

import { EquipmentManualService } from '@app/equipment/equipment-manual/equipment-manual.service';
import { RoutineCardioManaulProfileResponse } from '@app/routine/routine-manual/dtos/routine-cardio-manaul-profile.response';
import { RoutineManualProfileResponse } from '@app/routine/routine-manual/dtos/routine-manual-profile.response';
import { RoutineWeightManaulProfileResponse } from '@app/routine/routine-manual/dtos/routine-weight-manaul-profile.response';
import {
  RoutineCardioManualCreateCommand,
  RoutineManualDeleteCommand,
  RoutineManualUpdateCommand,
  RoutineWeightManualCreateCommand,
} from '@app/routine/routine-manual/routine-manual.command';
import { ManualNotFoundException } from '@domain/equipment/manual.errors';
import { RoutineManualNotFoundException } from '@domain/errors/routine.errors';
import { RoutineManual } from '@domain/routine/routine-manual.entity';

export class RoutineManualService {
  constructor(
    @InjectRepository(RoutineManual)
    private readonly routineManualRepository: Repository<RoutineManual>,
    private readonly manualService: EquipmentManualService,
  ) {}

  async createRoutineManual(
    data: RoutineCardioManualCreateCommand | RoutineWeightManualCreateCommand,
  ): Promise<RoutineManualProfileResponse> {
    const { manualId, ...routineManualData } = data;

    const manual = await this.manualService.getManualById(manualId);
    if (!manual) throw new ManualNotFoundException();

    const routineManual = await this.routineManualRepository.save({
      ...routineManualData,
      manual: { id: manual.id },
    });

    if (manual.type === '유산소') {
      return new RoutineCardioManaulProfileResponse(routineManual);
    }
    return new RoutineWeightManaulProfileResponse(routineManual);
  }

  async getRoutineManual(
    routineManualId: string,
  ): Promise<RoutineManualProfileResponse> {
    const routineManual = await this.findById(routineManualId);

    if (routineManual.manual.type === '유산소') {
      return new RoutineCardioManaulProfileResponse(routineManual);
    }
    return new RoutineWeightManaulProfileResponse(routineManual);
  }

  async updateRoutineManual(
    updateData: RoutineManualUpdateCommand,
  ): Promise<RoutineManualProfileResponse> {
    const originData = await this.findById(updateData.routineManualId);

    const manual = await this.manualService.getManualById(updateData.manualId);
    if (!manual) throw new ManualNotFoundException();

    const routineManual = await this.routineManualRepository.save({
      ...originData,
      ...updateData,
      manual: { id: manual.id },
    });

    if (manual.type === '유산소') {
      return new RoutineCardioManaulProfileResponse(routineManual);
    }
    return new RoutineWeightManaulProfileResponse(routineManual);
  }

  async deleteRoutineManual(
    data: RoutineManualDeleteCommand,
  ): Promise<boolean> {
    const routineManual = await this.findById(data.routineManualId);

    const { affected } = await this.routineManualRepository.softDelete(
      routineManual.id,
    );

    return affected > 0;
  }

  async findById(
    id: string,
    select?: FindOptionsSelect<RoutineManual>,
  ): Promise<RoutineManual> {
    const routineManual = await this.routineManualRepository.findOne({
      where: { id },
      select,
    });

    if (!routineManual) throw new RoutineManualNotFoundException();

    return routineManual;
  }
}
