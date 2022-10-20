import { RoutineLogProperties } from '@domain/routine/routine-log';

type UserInfo = { userId: string };
type RoutineInfo = { routineId: string };
type ManualInfo = { manualId: string };

type LogData = Pick<
  RoutineLogProperties,
  'targetNumber' | 'setNumber' | 'weight' | 'speed' | 'playMinute'
>;
type TimeData = Pick<RoutineLogProperties, 'startedAt' | 'endedAt'>;

export type RoutineLogCreateCommand = UserInfo &
  RoutineInfo &
  ManualInfo &
  Partial<LogData> &
  TimeData;

export type RoutineLogUpdateCommand = UserInfo & Partial<LogData & TimeData>;
