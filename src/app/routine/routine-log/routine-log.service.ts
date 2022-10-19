import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RoutineCoreService } from '@app/routine/routine-core/routine-core.service';
import {
  RoutineLogCreateCommand,
  RoutineLogUpdateCommand,
} from '@app/routine/routine-log/routine-log.command';
import { RoutineManualService } from '@app/routine/routine-manual/routine-manual.service';
import { RoutineLogNotFoundException } from '@domain/errors/routine.errors';
import { RoutineLog } from '@domain/routine/routine-log.entity';

@Injectable()
export class RoutineLogService {
  constructor(
    @InjectRepository(RoutineLog)
    private readonly routineLogRepository: Repository<RoutineLog>,
    private readonly routineService: RoutineCoreService,
    private readonly routineManualService: RoutineManualService,
  ) {}

  async getLogList(userId: string): Promise<RoutineLog[]> {
    return this.routineLogRepository.find({
      where: {
        user: { id: userId },
      },
      order: { startedAt: 'ASC', endedAt: 'ASC' },
      relations: ['routine', 'manual'],
    });
  }

  async getLog(logId: string, userId?: string): Promise<RoutineLog> {
    const log = await this.routineLogRepository.findOne({
      where: {
        id: logId,
        user: { id: userId },
      },
      relations: ['routine', 'manual'],
    });

    if (!log) throw new RoutineLogNotFoundException();

    return log;
  }

  async createLog(data: RoutineLogCreateCommand): Promise<RoutineLog> {
    const [routine, manual] = await Promise.all([
      this.routineService.getRoutineById(data.routineId),
      this.routineManualService.findById(data.manualId),
    ]);

    return this.routineLogRepository.save({
      routine,
      manual,
      user: { id: data.userId },
      startedAt: data.startedAt,
      endedAt: data.endedAt,
      targetNumber: data.targetNumber || manual.targetNumber || null,
      setNumber: data.setNumber || manual.setNumber || null,
      weight: data.weight || manual.weight || null,
      speed: data.speed || data.speed || null,
      playMinute: data.playMinute || data.playMinute || null,
    });
  }

  async updateLog(
    logId: string,
    data: RoutineLogUpdateCommand,
  ): Promise<RoutineLog> {
    const { userId, ...profile } = data;

    const log = await this.getLog(userId, logId);

    return this.routineLogRepository.save({
      ...log,
      ...profile,
    });
  }

  async deleteLog(logId: string): Promise<boolean> {
    const log = await this.getLog(logId);

    const { affected } = await this.routineLogRepository.delete({
      id: log.id,
    });

    return affected > 0;
  }
}
