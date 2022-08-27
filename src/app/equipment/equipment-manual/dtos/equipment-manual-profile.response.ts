import {
  EquipmentManual,
  EquipmentManualType,
} from '@domain/equipment/entities/equipment-manual.entity';

export class EquipmentManualProfileResponse {
  id!: string;
  title!: string;
  enTitle!: string;
  type!: EquipmentManualType;
  difficulty!: number;
  description!: string | null;
  precautions!: string | null;

  constructor(data: EquipmentManual) {
    this.id = data.id;
    this.title = data.title;
    this.enTitle = data.enTitle;
    this.type = data.type;
    this.difficulty = data.difficulty;
    this.description = data.description;
    this.precautions = data.precautions;
  }
}
