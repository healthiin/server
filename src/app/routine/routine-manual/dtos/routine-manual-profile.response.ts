import { RoutineCardioManaulProfileResponse } from '@app/routine/routine-manual/dtos/routine-cardio-manaul-profile.response';
import { RoutineWeightManaulProfileResponse } from '@app/routine/routine-manual/dtos/routine-weight-manaul-profile.response';

export type RoutineManualProfileResponse =
  | RoutineCardioManaulProfileResponse
  | RoutineWeightManaulProfileResponse;
