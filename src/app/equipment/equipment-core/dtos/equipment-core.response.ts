import { Equipment } from '@domain/equipment/entities/equipment.entity';

export class EquipmentCoreResponse {
  id: string;
  name: string;
  description?: string | null;
  constructor(equipment: Equipment) {
    this.id = equipment.id;
    this.name = equipment.name;
    this.description = equipment.description;
  }
}
