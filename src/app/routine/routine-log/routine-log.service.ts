import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isDateString } from 'class-validator';
import { parse } from 'date-fns';
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

  async getLogsByDate(userId: string, date: string): Promise<RoutineLog[]> {
    if (!isDateString(date))
      throw new BadRequestException('Use yyyy-MM-dd format');

    const createdDate = parse(date, 'yyyy-MM-dd', new Date());

    return this.routineLogRepository
      .createQueryBuilder('log')
      .where('log.user_id = :userId', { userId })
      .andWhere('log.started_at BETWEEN :start AND :end', {
        start: new Date(createdDate.setHours(0, 0, 0, 0)),
        end: new Date(createdDate.setHours(23, 59, 0, 0)),
      })
      .leftJoinAndSelect('log.routine', 'routine')
      .leftJoinAndSelect('log.manual', 'manual')
      .orderBy('log.started_at', 'ASC')
      .addOrderBy('log.ended_at', 'ASC')
      .getMany();
  }

  async getLogsByMonth(userId: string, date: string): Promise<RoutineLog[][]> {
    const createdDate = parse(date, 'yyyy-MM-dd', new Date());
    const lastDay = new Date(
      createdDate.getFullYear(),
      createdDate.getMonth() + 1,
      0,
    );
    const logsByMonth = [];
    for (let i = 0; i < lastDay.getDate(); i++) {
      const day = i < 9 ? `0${i + 1}` : `${i + 1}`;
      const newDate = date.replace(/\d{2}$/, day);
      const logs = await this.getLogsByDate(userId, newDate);
      logsByMonth.push(logs);
    }
    return logsByMonth;
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

    const log = await this.getLog(logId, userId);

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
