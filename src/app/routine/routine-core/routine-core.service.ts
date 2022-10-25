import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';

import { RoutineProfileResponse } from '@app/routine/routine-core/dtos/routine-profile.response';
import { RoutinePreviewResponse } from '@app/routine/routine-core/dtos/routine.preview.response';
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
import { RoutineNotFoundException } from '@domain/errors/routine.errors';
import { RoutineManual } from '@domain/routine/routine-manual.entity';
import { Routine } from '@domain/routine/routine.entity';
import { Pagination } from '@infrastructure/types/pagination.types';

export class RoutineCoreService {
  constructor(
    @InjectRepository(Routine)
    private readonly routineRepository: Repository<Routine>,
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
      relations: ['manuals', 'logs', 'author', 'owner'],
    });

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
  //           types: routine.routineManuals.map(
  //             (routineManual) => routineManual.manual.type,
  //           ),
  //         }),
  //     ),
  //     meta,
  //   };
  // }

  async getRoutines(
    data: RoutineListQuery,
  ): Promise<Pagination<RoutinePreviewResponse>> {
    const { items, meta } = await paginate(
      this.routineRepository,
      {
        page: data.page,
        limit: data.limit,
      },
      {
        where: { status: 'public' },
        relations: ['routineManuals'],
      },
    );
    items.map(async (routine) => {
      routine.routineManuals = await this.routineManualService.findByRoutineId(
        routine.id,
      );
    });
    console.log(items);

    return {
      items: items.map(
        (routine) =>
          new RoutinePreviewResponse({
            id: routine.id,
            title: routine.title,
            days: this.getDays(routine.day),
            types: routine.routineManuals.map(
              (routineManual) => routineManual.manual.type,
            ),
          }),
      ),
      meta,
    };
  }

  async createRoutine(data: RoutineCreateCommand): Promise<Routine> {
    const user = await this.userService.findById(data.userId);
    const days = await this.getBinaryDays(data.days);

    const routine = await this.routineRepository.save({
      author: user,
      owner: user,
      status: 'public',
      day: days,
      ...data,
    });

    return { ...routine, routineManuals: [] };
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
