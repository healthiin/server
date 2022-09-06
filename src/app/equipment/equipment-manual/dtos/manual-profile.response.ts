import { ManualProperties } from '@domain/equipment/equipment-manual';
import { Manual } from '@domain/equipment/equipment-manual.entity';

export class ManualProfileResponse
  implements Omit<ManualProperties, 'equipment' | 'routine' | 'deletedAt'>
{
  id!: string;
  title!: string;
  enTitle!: string;
  description!: string | null;
  type!: 'back' | 'shoulder' | 'chest' | 'arm' | 'lef' | 'abs';
  equipment!: string;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(data: Manual) {
    Object.assign(this, data);
    this.equipment = data.equipment.id;
  }
}
