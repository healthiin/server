import { RoutineCardioManualCreateRequest } from '@app/routine/routine-manual/dtos/routine-cardio-manual-create.request';
import { RoutineCardioManualUpdateRequest } from '@app/routine/routine-manual/dtos/routine-cardio-manual-update.request';
import { RoutineWeightManualCreateRequest } from '@app/routine/routine-manual/dtos/routine-weight-manual-create.request';
import { RoutineWeightManualUpdateRequest } from '@app/routine/routine-manual/dtos/routine-weight-manual-update.request';
import { Manual } from '@domain/equipment/equipment-manual.entity';
import { ManualType } from '@domain/equipment/manual-type';
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

export type RoutineManualResponseType = {
  manual: Manual;
  targetNumber?: number;
  setNumber?: number;
  weight?: number;
  speed?: number;
  playMinute?: number;
  order: number;
  type: ManualType;
};

export type RoutineManualUpdateRequest =
  | RoutineCardioManualUpdateRequest
  | RoutineWeightManualUpdateRequest;

export type RoutineManualCreateRequest =
  | RoutineCardioManualCreateRequest
  | RoutineWeightManualCreateRequest;
