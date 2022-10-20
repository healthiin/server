export type RoutineLogProperties = {
  id: string;
  targetNumber: number | null;
  setNumber: number | null;
  weight: number | null;
  speed: number | null;
  playMinute: number | null;
  startedAt: Date;
  endedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  userId?: string;
  routineId?: string;
  manualId?: string;
};
