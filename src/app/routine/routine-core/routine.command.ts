import { ManualProperties } from '@domain/equipment/equipment-manual';
import { RoutineProperties } from '@domain/routine/routine';
import { RoutineManualProperties } from '@domain/routine/routine-manual';

type RoutineInfo = { routineId: string };
type routineManualInfos = { routineManualIds: string[] };
type dayInfo = { days: number[] };
type UserInfo = { userId: string };

export type RoutineListQuery = {
  page: number;
  limit: number;
};
export type UserRoutineListQuery = RoutineListQuery & UserInfo;

export type RoutineCreateCommand = UserInfo &
  dayInfo &
  routineManualInfos &
  Pick<RoutineProperties, 'title' | 'description'>;

export type RoutineUpdateCommand = UserInfo &
  RoutineInfo &
  Partial<RoutineCreateCommand>;
export type RoutineDeleteCommand = RoutineInfo;

export type RoutineProfileProperties = Omit<
  RoutineProperties,
  'routineManuals'
> & {
  types: string[];
  days: number[];
  routineManuals: any[]; //routineManualType[];
};

export type routineManualType = {
  routineManualId: string;
  manualId: string;
} & Partial<RoutineManualProperties> &
  Partial<ManualProperties>;
