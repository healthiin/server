import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';

import { MyRoutinePreviewResponse } from '@app/routine/routine-core/dtos/my-routine-preview.response';
import { MyRoutineProfileResponse } from '@app/routine/routine-core/dtos/my-routine-profile.response';
import { ReferenceRoutinePreviewResponse } from '@app/routine/routine-core/dtos/reference-routine-preview.response';
import { ReferenceRoutineProfileResponse } from '@app/routine/routine-core/dtos/reference-routine-profile.response';
import {
  MyRoutineCreateCommand,
  RoutineCopyCommand,
  RoutineCreateCommand,
  RoutineDeleteCommand,
  RoutineListQuery,
  RoutineUpdateCommand,
  UserRoutineListQuery,
} from '@app/routine/routine-core/routine.command';
import { RoutineManualProfileResponse } from '@app/routine/routine-manual/dtos/routine-manual-profile.response';
import { RoutineManualService } from '@app/routine/routine-manual/routine-manual.service';
import { UserService } from '@app/user/user.service';
import { Manual } from '@domain/equipment/equipment-manual.entity';
import { ManualType } from '@domain/equipment/manual-type';
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

  async getReferenceRoutineProfile(
    routineId: string,
  ): Promise<ReferenceRoutineProfileResponse> {
    const routine = await this.getRoutineById(routineId);
    const days = this.getDays(routine.day);
    const types = routine.routineManuals.map(
      (routineManual) => routineManual.manual.type,
    );
    const routineManuals = routine.routineManuals.map(
      (routineManual) =>
        new RoutineManualProfileResponse({
          ...routineManual,
        }),
    );

    return new ReferenceRoutineProfileResponse({
      id: routine.id,
      title: routine.title,
      description: routine.description,
      likeCount: routine.likeCount,
      days,
      types,
      routineManuals,
    });
  }

  async getMyRoutineProfile(data: {
    userId: string;
    routineId: string;
  }): Promise<MyRoutineProfileResponse> {
    const routine = await this.getRoutineById(data.routineId);
    const days = this.getDays(routine.day);
    const types = routine.routineManuals.map(
      (routineManual) => routineManual.manual.type,
    );
    const routineManuals = routine.routineManuals.map(
      (routineManual) =>
        new RoutineManualProfileResponse({
          ...routineManual,
        }),
    );

    return new MyRoutineProfileResponse({
      id: routine.id,
      title: routine.title,
      days,
      types,
      routineManuals,
    });
  }

  async getRoutineById(
    id: string,
    select?: FindOptionsSelect<Routine>,
  ): Promise<Routine> {
    const routine = await this.routineRepository.findOne({
      where: { id },
      select,
      relations: ['routineManuals', 'routineManuals.manual', 'author', 'owner'],
    });

    if (!routine) throw new RoutineNotFoundException();
    return routine;
  }

  async getMyRoutines(
    data: UserRoutineListQuery,
  ): Promise<Pagination<MyRoutinePreviewResponse>> {
    const { items, meta } = await paginate(
      this.routineRepository,
      {
        page: data.page,
        limit: data.limit,
      },
      {
        where: { owner: { id: data.userId } },
      },
    );

    return {
      items: items.map(
        (routine) =>
          new MyRoutinePreviewResponse({
            id: routine.id,
            title: routine.title,
            days: this.getDays(routine.day),
            types: this.getRoutineTypes(routine),
          }),
      ),
      meta,
    };
  }

  async getReferenceRoutines(
    data: RoutineListQuery,
  ): Promise<Pagination<ReferenceRoutinePreviewResponse>> {
    const { items, meta } = await paginate(
      this.routineRepository,
      {
        page: data.page,
        limit: data.limit,
      },
      {
        where: { status: 'public' },
        relations: ['routineManuals', 'routineManuals.manual'],
      },
    );
    items.map(async (routine) => {
      routine.routineManuals = await this.routineManualService.findByRoutineId(
        routine.id,
      );
    });

    return {
      items: items.map(
        (routine) =>
          new ReferenceRoutinePreviewResponse({
            id: routine.id,
            description: routine.description,
            title: routine.title,
            days: this.getDays(routine.day),
            types: this.getRoutineTypes(routine),
          }),
      ),
      meta,
    };
  }

  async createRoutine(
    data: RoutineCreateCommand,
  ): Promise<ReferenceRoutineProfileResponse> {
    const user = await this.userService.findById(data.userId);

    const routine = await this.routineRepository.save({
      author: user,
      owner: user,
      status: 'public',
      day: 0,
      ...data,
    });

    return new ReferenceRoutineProfileResponse({
      id: routine.id,
      title: routine.title,
      description: routine.description,
      routineManuals: [],
      days: [0, 0, 0, 0, 0, 0, 0],
      likeCount: 0,
      types: [],
    });
  }

  async createMyRoutine(
    data: MyRoutineCreateCommand,
  ): Promise<MyRoutineProfileResponse> {
    const user = await this.userService.findById(data.userId);
    const day = await this.getBinaryDays(data.days);

    const routine = await this.routineRepository.save({
      author: user,
      owner: user,
      status: 'private',
      day,
      description: '',
      title: data.title,
    });

    return new MyRoutineProfileResponse({
      id: routine.id,
      title: routine.title,
      days: data.days,
      types: [],
      routineManuals: [],
    });
  }

  async copyRoutine(
    data: RoutineCopyCommand,
  ): Promise<MyRoutineProfileResponse> {
    const user = await this.userService.findById(data.userId);
    const originRoutine = await this.getRoutineById(data.routineId);
    const day = this.getBinaryDays(data.days);

    const routine = await this.routineRepository.save({
      owner: user,
      status: 'private',
      day,
      ...originRoutine,
    });

    return new MyRoutineProfileResponse({
      id: routine.id,
      title: routine.title,
      types: this.getRoutineTypes(routine),
      days: this.getDays(routine.day),
      routineManuals: routine.routineManuals.map(
        (routineManual) =>
          new RoutineManualProfileResponse({
            ...routineManual,
          }),
      ),
    });
  }

  // async editRoutine(data: RoutineUpdateCommand): Promise<Routine> {
  //   const routine = await this.getRoutineById(data.routineId);
  //   const days = await this.getBinaryDays(data.days);
  //   return this.routineRepository.save({
  //     ...routine,
  //     ...data,
  //     days,
  //   });
  // }

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

  getRoutineTypes(routine: Routine): ManualType[] {
    return routine.routineManuals.map(
      (routineManual) => routineManual.manual.type,
    );
  }

  async getRoutineManualsByRoutineId(
    routineId: string,
  ): Promise<RoutineManual[]> {
    return this.routineManualService.findByRoutineId(routineId);
  }
}
