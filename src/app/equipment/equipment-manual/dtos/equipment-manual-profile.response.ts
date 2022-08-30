import { Manual } from '@domain/manual/manual.entity';

export class EquipmentManualProfileResponse {
  id!: string;
  title!: string;
  enTitle!: string;
  difficulty!: number;
  description!: string | null;
  precautions!: string | null;

  constructor(data: Manual) {
    this.id = data.id;
    this.title = data.title;
    this.enTitle = data.enTitle;
    this.difficulty = data.difficulty;
    this.description = data.description;
    this.precautions = data.precautions;
  }
}
