import { RoutineManualProfileResponse } from '@app/routine/routine-manual/dtos/routine-manual-profile.response';
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
  dayInfo &
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
  routineManuals: RoutineManualProfileResponse[];
};
