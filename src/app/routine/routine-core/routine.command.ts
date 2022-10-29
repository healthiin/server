import { RoutineManualProfileResponse } from '@app/routine/routine-manual/dtos/routine-manual-profile.response';
import { ManualType } from '@domain/equipment/manual-type';
import { RoutineProperties } from '@domain/routine/routine';

type RoutineInfo = { routineId: string };
type dayInfo = { days: number[] };
type UserInfo = { userId: string };

export type RoutineListQuery = {
  page: number;
  limit: number;
};
export type UserRoutineListQuery = RoutineListQuery & UserInfo;

export type RoutineCreateCommand = UserInfo &
  Pick<RoutineProperties, 'title' | 'description'>;

export type MyRoutineCreateCommand = UserInfo &
  dayInfo &
  Pick<RoutineProperties, 'title'>;

export type RoutineCopyCommand = UserInfo & RoutineInfo & dayInfo;

export type RoutineUpdateCommand = UserInfo &
  RoutineInfo &
  Partial<MyRoutineCreateCommand>;

export type RoutineDeleteCommand = RoutineInfo;

export type RoutineResponseProperties = {
  types: ManualType[];
  routineManuals: RoutineManualProfileResponse[];
} & Omit<RoutineProperties, 'routineManuals'> &
  dayInfo;
