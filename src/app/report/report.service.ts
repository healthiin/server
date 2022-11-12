import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Masker } from '@toss/utils';
import { addDays, endOfWeek, setWeek, startOfWeek } from 'date-fns';
import { group, range } from 'radash';
import { Repository } from 'typeorm';

import { ReportLogResponse } from '@app/report/dtos/report-log.response';
import { ReportMealResponse } from '@app/report/dtos/report-meal.response';
import { CreateReportCommand, ReportItem } from '@app/report/report.commands';
import { Meal } from '@domain/meal/meal.entity';
import { Report } from '@domain/report/report.entity';
import { ReportNotFoundException } from '@domain/report/report.error';
import { RoutineLog } from '@domain/routine/routine-log.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
    @InjectRepository(RoutineLog)
    private readonly routineLogRepository: Repository<RoutineLog>,
    @InjectRepository(Meal)
    private readonly mealRepository: Repository<Meal>,
  ) {}

  async createReport(data: CreateReportCommand) {
    return this.reportRepository.save({
      ...data,
      user: { id: data.userId },
      title: `${data.year}년 ${data.week}주차 종합 운동리포트`,
    });
  }

  async getReports(userId: string): Promise<Report[]> {
    return this.reportRepository.find({
      where: { user: { id: userId } },
      order: { year: 'ASC', week: 'ASC' },
    });
  }

  async getReportInfo(reportId: string): Promise<Report> {
    const report = await this.reportRepository.findOne({
      where: { id: reportId },
      relations: ['user'],
    });

    if (!report) throw new ReportNotFoundException();
    return report;
  }

  async generateReport(reportId: string) {
    const report = await this.getReportInfo(reportId);

    // Get Date Range with year and week.
    const { startCursor, endCursor } = this.getDateRange(
      report.year,
      report.week,
    );

    // Get Raw Data.
    const [logs, meals] = await Promise.all([
      this.getLogs(startCursor, endCursor, report.user.id),
      this.getMeals(startCursor, endCursor, report.user.id),
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
    return {
      user: Masker.maskName(report.user.nickname),
      title: report.title,
      result,
    };
  }

  private getMeals(
    startCursor: Date,
    endCursor: Date,
    userId: string,
  ): Promise<Meal[]> {
    return this.mealRepository
      .createQueryBuilder('meal')
      .where('meal.user_id = :userId', { userId })
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
      .where('log.user_id = :userId', { userId })
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
