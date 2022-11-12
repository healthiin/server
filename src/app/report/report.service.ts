import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { addDays, endOfWeek, setWeek, startOfWeek } from 'date-fns';
import { group, range } from 'radash';
import { Repository } from 'typeorm';

import { ReportLogResponse } from '@app/report/dtos/report-log.response';
import { ReportMealResponse } from '@app/report/dtos/report-meal.response';
import { ReportItem, ReportSearch } from '@app/report/report.commands';
import { Meal } from '@domain/meal/meal.entity';
import { RoutineLog } from '@domain/routine/routine-log.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(RoutineLog)
    private readonly routineLogRepository: Repository<RoutineLog>,
    @InjectRepository(Meal)
    private readonly mealRepository: Repository<Meal>,
  ) {}

  async getWeeklyReport(data: ReportSearch) {
    // Get Date Range with year and week.
    const { startCursor, endCursor } = this.getDateRange(data.year, data.week);

    // Get Raw Data.
    const [logs, meals] = await Promise.all([
      this.getLogs(startCursor, endCursor, data.userId),
      this.getMeals(startCursor, endCursor, data.userId),
    ]);

    // Initialize Response.
    const result = new Map<string, ReportItem>();
    Array.from(range(0, 6)).forEach((day) =>
      result.set(addDays(startCursor, day).getDate().toString(), {
        logs: [],
        logStatistics: new Set(),
        meals: [],
        mealStatistics: null,
      }),
    );

    // Set Routine Logs and Statistics.
    Object.entries(this.groupRoutineLogs(logs)).forEach(([day, logs]) => {
      result.get(day).logs = logs;
      logs
        .map((log) => log.type)
        .map((type) => result.get(day).logStatistics.add(type));
    });

    // Set Meal Logs and Statistics.
    Object.entries(this.groupMealLogs(meals)).forEach(([day, meals]) => {
      result.get(day).meals = meals;
      result.get(day).mealStatistics = {
        carbohydrate: meals.reduce(
          (acc, meal) => acc + meal.nutrients.carbohydrate,
          0,
        ),
        protein: meals.reduce((acc, meal) => acc + meal.nutrients.protein, 0),
        fat: meals.reduce((acc, meal) => acc + meal.nutrients.fat, 0),
      };
    });

    // Return Weekly Report.
    return result;
  }

  private getMeals(
    startCursor: Date,
    endCursor: Date,
    userId: string,
  ): Promise<Meal[]> {
    return this.mealRepository
      .createQueryBuilder('meal')
      .where('meal.user_id >= :userId', { userId })
      .andWhere('meal.createdAt >= :startCursor', { startCursor })
      .andWhere('meal.createdAt < :endCursor', { endCursor })
      .getMany();
  }

  private getLogs(
    startCursor: Date,
    endCursor: Date,
    userId: string,
  ): Promise<RoutineLog[]> {
    return this.routineLogRepository
      .createQueryBuilder('log')
      .where('log.user_id >= :userId', { userId })
      .andWhere('log.startedAt >= :startCursor', { startCursor })
      .andWhere('log.startedAt < :endCursor', { endCursor })
      .leftJoinAndSelect('log.manual', 'routine_manual')
      .leftJoinAndSelect('routine_manual.manual', 'manual')
      .orderBy('log.started_at', 'ASC')
      .addOrderBy('log.ended_at', 'ASC')
      .getMany();
  }

  private groupMealLogs(meals: Meal[]): Record<string, ReportMealResponse[]> {
    return group(
      meals.map((meal) => new ReportMealResponse(meal)),
      (meal) => meal.day,
    );
  }

  private groupRoutineLogs(
    logs: RoutineLog[],
  ): Record<string, ReportLogResponse[]> {
    return group(
      logs.map((log) => new ReportLogResponse(log)),
      (log) => log.day,
    );
  }

  private getDateRange(
    year: number,
    week: number,
  ): { startCursor: Date; endCursor: Date } {
    const initial = setWeek(new Date(year, 0, 0, 0, 0, 0), week);
    const startCursor = startOfWeek(initial);

    return {
      startCursor,
      endCursor: endOfWeek(startCursor),
    };
  }
}
