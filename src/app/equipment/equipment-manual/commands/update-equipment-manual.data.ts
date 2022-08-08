import { EquipmentManualType } from '@domain/equipment/entities/equipment-manual.entity';

export type UpdateEquipmentManualData = {
  title?: string;
  enTitle?: string;
  type?: EquipmentManualType;
  difficulty?: number;
  description?: string;
  precautions?: string;
};
