import { ManualProperties } from '@domain/equipment/equipment-manual';

type ManualInfo = { manualId: string };
type EquipmentInfo = { equipmentId: string };

export type ManualCreateCommand = Pick<
  ManualProperties,
  'title' | 'enTitle' | 'description' | 'type' | 'precautions'
>;

export type ManualUpdateCommand = ManualInfo &
  Partial<EquipmentInfo> &
  Partial<ManualCreateCommand>;

export type ManualDeleteCommand = ManualInfo;
