import { Equipment } from '@domain/equipment/entities/equipment.entity';

export class EquipmentProfileResponse {
  private id!: string;
  private title!: string;
  private enTitle!: string;
  private description!: string | null;

  constructor(data: Equipment) {
    this.id = data.id;
    this.title = data.title;
    this.enTitle = data.enTitle;
    this.description = data.description;
  }
}
