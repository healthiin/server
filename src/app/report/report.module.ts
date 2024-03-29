import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReportController } from '@app/report/report.controller';
import { ReportService } from '@app/report/report.service';
import { Meal } from '@domain/meal/meal.entity';
import { Report } from '@domain/report/report.entity';
import { RoutineLog } from '@domain/routine/routine-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoutineLog, Meal, Report])],
  controllers: [ReportController],
  providers: [ReportService],
  exports: [ReportService],
})
export class ReportModule {}
