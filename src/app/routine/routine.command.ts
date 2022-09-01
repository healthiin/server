import { RoutineProperties } from '@domain/routine/routine';

type RoutineInfo = { routineId: string };

export type RoutineListQuery = {
  page: number;
  limit: number;
};

export type RoutineCreateCommand = Pick<
  RoutineProperties,
  'description' | 'title'
>;

export type RoutineUpdateCommand = Partial<RoutineProperties>;
export type RoutineDeleteCommand = RoutineInfo;
