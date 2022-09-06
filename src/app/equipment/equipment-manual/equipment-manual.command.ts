import { ManualProperties } from '@domain/equipment/equipment-manual';

type EquipmentInfo = { equipmentId: string };
type ManualInfo = { manualId: string };

export type ManualCreateCommand = EquipmentInfo &
  Pick<ManualProperties, 'title' | 'enTitle' | 'description' | 'type'>;

export type ManualUpdateCommand = ManualInfo & Partial<ManualCreateCommand>;

export type ManualDeleteCommand = ManualInfo;
