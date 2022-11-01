import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';

import { EquipmentManualService } from '@app/equipment/equipment-manual/equipment-manual.service';
import { RoutineManualProfileResponse } from '@app/routine/routine-manual/dtos/routine-manual-profile.response';
import {
  RoutineManualCreateCommand,
  RoutineManualDeleteCommand,
  RoutineManualUpdateCommand,
} from '@app/routine/routine-manual/routine-manual.command';
import { ManualNotFoundException } from '@domain/equipment/manual.errors';
import {
  RoutineManualNotFoundException,
  RoutineNotFoundException,
} from '@domain/errors/routine.errors';
import { RoutineManual } from '@domain/routine/routine-manual.entity';
import { Routine } from '@domain/routine/routine.entity';

export class RoutineManualService {
  constructor(
    @InjectRepository(RoutineManual)
    private readonly routineManualRepository: Repository<RoutineManual>,
    @InjectRepository(Routine)
    private readonly routineRepository: Repository<Routine>,
    private readonly manualService: EquipmentManualService,
  ) {}

  async createRoutineManual(
    data: RoutineManualCreateCommand,
  ): Promise<RoutineManualProfileResponse> {
    const { manualId, ...routineManualData } = data;

    const manual = await this.manualService.findById(manualId);
    if (!manual) throw new ManualNotFoundException();

    const routineManual = await this.routineManualRepository.save({
      ...routineManualData,
      routine: { id: data.routineId },
      manual: { id: manual.id },
    });

    return new RoutineManualProfileResponse({
      ...manual,
      ...routineManual,
    });
  }

  async getRoutineManual(
    routineManualId: string,
  ): Promise<RoutineManualProfileResponse> {
    const routineManual = await this.findById(routineManualId);
    const manual = await this.manualService.findById(routineManual.manual.id);

    return new RoutineManualProfileResponse({
      ...manual,
      ...routineManual,
    });
  }

  async updateRoutineManual(
    updateData: RoutineManualUpdateCommand,
  ): Promise<RoutineManualProfileResponse> {
    const { routine, manual, ...originData } = await this.findById(
      updateData.routineManualId,
    );
    let routineManual = await this.routineManualRepository.save({
      ...originData,
      ...updateData,
    });

    if (updateData.routineId) {
      const routine = await this.routineRepository.findOne({
        where: { id: updateData.routineId },
      });
      if (!routine) throw new RoutineNotFoundException();

      routineManual = await this.routineManualRepository.save({
        ...routineManual,
        routine: { id: routine.id },
      });
    }

    if (updateData.manualId) {
      const manual = await this.manualService.getManualById(
        updateData.manualId,
      );
      if (!manual) throw new ManualNotFoundException();
      routineManual = await this.routineManualRepository.save({
        ...routineManual,
        manual: { id: manual.id },
      });
    }

    return new RoutineManualProfileResponse({
      ...routineManual,
    });
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
      relations: ['routine', 'manual'],
    });

    if (!routineManual) throw new RoutineManualNotFoundException();

    return routineManual;
  }

  async findByRoutineId(id: string): Promise<RoutineManual[]> {
    const routineManuals = await this.routineManualRepository.findBy({
      routine: { id },
    });

    if (!routineManuals) throw new RoutineManualNotFoundException();

    return routineManuals;
  }
}
