import { EquipmentManualType } from '@domain/equipment/entities/equipment-manual.entity';

export type CreateEquipmentManualData = {
  title: string;
  enTitle: string;
  type: EquipmentManualType;
  difficulty: number;
  description?: string | null;
  precautions?: string | null;
};
