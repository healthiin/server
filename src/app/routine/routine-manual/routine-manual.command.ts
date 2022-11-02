import { RoutineManualProperties } from '@domain/routine/routine-manual';

type RoutineManualInfo = { routineManualId: string };
type RoutineInfo = { routineId: string };
type ManualInfo = { manualId: string };

export type RoutineCardioManualCreateCommand = Pick<
  RoutineManualProperties,
  'speed' | 'playMinute' | 'order'
>;

export type RoutineWeightManualCreateCommand = Pick<
  RoutineManualProperties,
  'targetNumber' | 'setNumber' | 'weight' | 'order'
>;

export type RoutineManualCreateCommand = ManualInfo &
  RoutineInfo &
  (RoutineCardioManualCreateCommand | RoutineWeightManualCreateCommand);
export type RoutineManualUpdateCommand = RoutineManualInfo &
  Partial<RoutineManualCreateCommand>;

export type RoutineManualDeleteCommand = RoutineManualInfo;
