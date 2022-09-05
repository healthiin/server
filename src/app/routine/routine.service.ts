import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';

import { RoutineProfileResponse } from '@app/routine/dtos/routine-profile.response';
import {
  RoutineCreateCommand,
  RoutineDeleteCommand,
  RoutineListQuery,
  RoutineUpdateCommand,
} from '@app/routine/routine.command';
import { RoutineNotFoundException } from '@domain/errors/routine.errors';
import { Manual } from '@domain/manual/manual.entity';
import { Routine } from '@domain/routine/routine.entity';
import { Pagination } from '@infrastructure/types/pagination.types';

export class RoutineService {
  constructor(
    @InjectRepository(Routine)
    private readonly routineRepository: Repository<Routine>,
    @InjectRepository(Manual)
    private readonly manualRepository: Repository<Manual>,
  ) {}

  async getRoutineById(
    id: string,
    select?: FindOptionsSelect<Routine>,
  ): Promise<Routine> {
    const routine = await this.routineRepository.findOne({
      where: { id },
      select,
    });
    if (!routine) throw new RoutineNotFoundException();
    return routine;
  }

  async getRoutines(
    data: RoutineListQuery,
  ): Promise<Pagination<RoutineProfileResponse>> {
    const { items, meta } = await paginate(this.routineRepository, {
      page: data.page,
      limit: data.limit,
    });

    return {
      items: items.map((routine) => new RoutineProfileResponse(routine)),
      meta,
    };
  }

  async createRoutine(data: RoutineCreateCommand): Promise<Routine> {
    await this.validateManuals(data.manualIds);

    return this.routineRepository.save(data);
  }

  async editRoutine(data: RoutineUpdateCommand): Promise<Routine> {
    await this.validateManuals(data.manualIds);

    const routine = await this.getRoutineById(data.routineId);

    return this.routineRepository.save({
      ...routine,
      ...data,
    });
  }

  async deleteRoutine(data: RoutineDeleteCommand): Promise<boolean> {
    const routine = await this.getRoutineById(data.routineId);

    const { affected } = await this.routineRepository.softDelete({
      id: routine.id,
    });
    return affected > 0;
  }

  protected async validateManuals(manualIds: string[]): Promise<void> {
    console.log(manualIds);
    const test = manualIds.map(async (manualId) => {
      await this.manualRepository.find({
        where: { id: manualId },
      });
    });
    console.log(test);
  }
}
