import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Equipment } from '@domain/equipment/entities/equipment.entity';

export class EquipmentProfileResponse {
  @ApiProperty() private id!: string;
  @ApiPropertyOptional() private description!: string | null;

  constructor(data: Equipment) {
    this.id = data.id;
    this.description = data.description;
  }
}
