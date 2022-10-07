import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationMeta, paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';

import { RoutineProfileResponse } from '@app/routine/routine-core/dtos/routine-profile.response';
import {
  RoutineCreateCommand,
  RoutineDeleteCommand,
  RoutineListQuery,
  RoutineUpdateCommand,
} from '@app/routine/routine-core/routine.command';
import { UserService } from '@app/user/user.service';
import { Manual } from '@domain/equipment/equipment-manual.entity';
import { RoutineNotFoundException } from '@domain/errors/routine.errors';
import { Routine } from '@domain/routine/routine.entity';

export class RoutineCoreService {
  constructor(
    @InjectRepository(Routine)
    private readonly routineRepository: Repository<Routine>,
    @InjectRepository(Manual)
    private readonly manualRepository: Repository<Manual>,
    private readonly userService: UserService,
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

  async getRoutines(data: RoutineListQuery): Promise<{
    meta: IPaginationMeta;
    items: Promise<RoutineProfileResponse>[];
  }> {
    const { items, meta } = await paginate(
      this.routineRepository,
      {
        page: data.page,
        limit: data.limit,
      },
      {
        where: { status: 'public' },
      },
    );

    return {
      items: items.map(async (routine) => {
        return new RoutineProfileResponse({
          ...routine,
          days: await this.getdays(routine.day),
        });
      }),
      meta,
    };
  }

  async createRoutine(data: RoutineCreateCommand): Promise<Routine> {
    const user = await this.userService.findById(data.userId);
    await this.validateManuals(data.routineManualIds);

    const days = await this.getBinaryDays(data.days);

    return this.routineRepository.save({
      author: user,
      owner: user,
      days,
      ...data,
    });
  }

  async editRoutine(data: RoutineUpdateCommand): Promise<Routine> {
    const routine = await this.getRoutineById(data.routineId);
    const days = await this.getBinaryDays(data.days);
    return this.routineRepository.save({
      ...routine,
      ...data,
      days,
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
    manualIds.map(async (manualId) => {
      await this.manualRepository.find({
        where: { id: manualId },
      });
    });
  }

  protected async getBinaryDays(days: number[]): Promise<number> {
    let i;
    let binaryDays = 0;
    for (i = 0; i < 7; i++) {
      if (days[i] === 1) {
        binaryDays += 2 ** i;
      }
    }
    return binaryDays;
  }

  async getdays(binaryDays: number): Promise<number[]> {
    let i;
    const days = [];
    for (i = 0; i < 7; i++) {
      if (binaryDays >= 2 ** i) {
        binaryDays -= 2 ** i;
        days.push(1);
      } else {
        days.push(0);
      }
    }
    return days;
  }
}
