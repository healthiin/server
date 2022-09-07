import { RoutineProperties } from '@domain/routine/routine';

type RoutineInfo = { routineId: string };
type manualIds = { manualIds: string[] };
type UserInfo = { userId: string };

export type RoutineListQuery = {
  page: number;
  limit: number;
};

export type RoutineCreateCommand = UserInfo &
  manualIds &
  Pick<RoutineProperties, 'title' | 'description'>;

export type RoutineUpdateCommand = UserInfo &
  RoutineInfo &
  Partial<RoutineCreateCommand>;
export type RoutineDeleteCommand = RoutineInfo;
