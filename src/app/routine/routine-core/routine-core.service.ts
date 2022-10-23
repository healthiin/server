import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';

import { RoutineProfileResponse } from '@app/routine/routine-core/dtos/routine-profile.response';
import {
  RoutineCreateCommand,
  RoutineDeleteCommand,
  RoutineListQuery,
  RoutineUpdateCommand,
  UserRoutineListQuery,
} from '@app/routine/routine-core/routine.command';
import { RoutineManualService } from '@app/routine/routine-manual/routine-manual.service';
import { UserService } from '@app/user/user.service';
import { Manual } from '@domain/equipment/equipment-manual.entity';
import { ManualType } from '@domain/equipment/manual-type';
import { RoutineNotFoundException } from '@domain/errors/routine.errors';
import { RoutineManual } from '@domain/routine/routine-manual.entity';
import { RoutineType } from '@domain/routine/routine-type.entity';
import { Routine } from '@domain/routine/routine.entity';
import { Pagination } from '@infrastructure/types/pagination.types';

export class RoutineCoreService {
  constructor(
    @InjectRepository(Routine)
    private readonly routineRepository: Repository<Routine>,
    @InjectRepository(RoutineType)
    private readonly routineTypeRepository: Repository<RoutineType>,
    @InjectRepository(Manual)
    private readonly manualRepository: Repository<Manual>,
    private readonly userService: UserService,
    private readonly routineManualService: RoutineManualService,
  ) {}

  async getRoutineById(
    id: string,
    select?: FindOptionsSelect<Routine>,
  ): Promise<Routine> {
    const routine = await this.routineRepository.findOne({
      where: { id },
      select,
      relations: ['types', 'manuals', 'logs', 'author', 'owner'],
    });
    console.log(routine);
    if (!routine) throw new RoutineNotFoundException();
    return routine;
  }

  // async getMyRoutines(
  //   data: UserRoutineListQuery,
  // ): Promise<Pagination<RoutineProfileResponse>> {
  //   const { items, meta } = await paginate(
  //     this.routineRepository,
  //     {
  //       page: data.page,
  //       limit: data.limit,
  //     },
  //     {
  //       where: { owner: { id: data.userId } },
  //     },
  //   );
  //
  //   return {
  //     items: items.map(
  //       (routine) =>
  //         new RoutineProfileResponse({
  //           ...routine,
  //           days: this.getDays(routine.day),
  //         }),
  //     ),
  //     meta,
  //   };
  // }

  // async getRoutines(
  //   data: RoutineListQuery,
  // ): Promise<Pagination<RoutineProfileResponse>> {
  //   const { items, meta } = await paginate(
  //     this.routineRepository,
  //     {
  //       page: data.page,
  //       limit: data.limit,
  //     },
  //     {
  //       where: { status: 'public' },
  //     },
  //   );
  //
  //   return {
  //     items: items.map(
  //       (routine) =>
  //         new RoutineProfileResponse({
  //           ...routine,
  //           days: this.getDays(routine.day),
  //         }),
  //     ),
  //     meta,
  //   };
  // }

  // async getRoutinesByType(
  //   data: RoutineListQuery,
  //   type: ManualType,
  // ): Promise<Pagination<RoutineProfileResponse>> {
  //   const repository = this.routineRepository
  //     .createQueryBuilder('routine')
  //     .leftJoinAndSelect('routine.types', 'types')
  //     .where('types.type = :type', { type })
  //     .andWhere('routine.status = :status', { status: 'public' });
  //
  //   const { items, meta } = await paginate(repository, {
  //     page: data.page,
  //     limit: data.limit,
  //   });
  //
  //   return {
  //     items: items.map(
  //       (routine) =>
  //         new RoutineProfileResponse({
  //           ...routine,
  //           days: this.getDays(routine.day),
  //         }),
  //     ),
  //     meta,
  //   };
  // }

  async createRoutine(data: RoutineCreateCommand): Promise<Routine> {
    const user = await this.userService.findById(data.userId);
    await this.validateManuals(data.routineManualIds);
    const routineManuals = [];
    data.routineManualIds.map(async (id) => {
      const routineManual = await this.routineManualService.findById(id);
      routineManuals.push({
        ...routineManual,
        ...routineManual.manual,
        routineManualId: routineManual.id,
        manualId: routineManual.manual.id,
      });
    });
    const days = await this.getBinaryDays(data.days);

    const routine = await this.routineRepository.save({
      author: user,
      owner: user,
      status: 'private',
      day: days,
      ...data,
    });
    return { ...routine, routineManuals };
  }

  // async copyRoutine(data: { userId; routineId }): Promise<Routine> {
  //   const user = await this.userService.findById(data.userId);
  //   const routine = await this.getRoutineById(data.routineId);
  //   return routine;
  // }

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

  getDays(binaryDays: number): number[] {
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

  async getRoutineManualsByRoutineId(
    routineId: string,
  ): Promise<RoutineManual[]> {
    return this.routineManualService.findByRoutineId(routineId);
  }
}
