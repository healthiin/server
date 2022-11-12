import { ReportLogResponse } from '@app/report/dtos/report-log.response';
import {
  ReportMealResponse,
  ReportMealStatistics,
} from '@app/report/dtos/report-meal.response';

export type ReportSearch = {
  year: number;
  week: number;
  userId: string;
};

export type ReportItem = {
  logs?: ReportLogResponse[];
  logStatistics?: Set<string>;
  meals?: ReportMealResponse[];
  mealStatistics?: ReportMealStatistics;
};
