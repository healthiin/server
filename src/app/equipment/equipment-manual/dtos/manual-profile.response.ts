import { Manual } from '@domain/equipment/entities/manual.entity';

export class ManualProfileResponse {
  id: string;
  name: string;
  description: string;

  constructor(data: Manual) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
  }
}
