import { EquipmentManual } from '@domain/equipment/entities/equipment-manual.entity';

export class EquipmentManualProfileResponse {
  id!: string;
  title!: string;
  enTitle!: string;
  type!: '등' | '팔' | '다리' | '가슴' | '복근' | '유산소' | '어깨' | '하체';
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
