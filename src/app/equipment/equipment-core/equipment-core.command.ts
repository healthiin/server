import { EquipmentProperties } from '@domain/equipment/equipment';

type EquipmentInfo = { equipmentId: string };

export type EquipmentCreateCommand = Pick<
  EquipmentProperties,
  'name' | 'enName' | 'description'
>;

export type EquipmentUpdateCommand = EquipmentInfo &
  Partial<EquipmentCreateCommand>;

export type EquipmentDeleteCommand = EquipmentInfo;
