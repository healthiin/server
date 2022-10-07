import { RoutineManualProperties } from '@domain/routine/routine-manual';

type RoutineManualInfo = { routineManualId: string };
type ManualInfo = { manualId: string };

export type RoutineCardioManualCreateCommand = ManualInfo &
  Pick<RoutineManualProperties, 'speed' | 'playMinute' | 'order'>;

export type RoutineWeightManualCreateCommand = ManualInfo &
  Pick<
    RoutineManualProperties,
    'targetNumber' | 'setNumber' | 'weight' | 'order'
  >;

export type RoutineManualUpdateCommand = RoutineManualInfo &
  Partial<RoutineCardioManualCreateCommand | RoutineWeightManualCreateCommand>;

export type RoutineManualDeleteCommand = RoutineManualInfo;
