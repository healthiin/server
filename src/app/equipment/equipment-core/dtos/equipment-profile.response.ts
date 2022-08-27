import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Equipment } from '@domain/equipment/entities/equipment.entity';

export class EquipmentProfileResponse {
  @ApiProperty() private id!: string;
  @ApiProperty() private title!: string;
  @ApiProperty() private enTitle!: string;
  @ApiPropertyOptional() private description!: string | null;

  constructor(data: Equipment) {
    this.id = data.id;
    this.title = data.title;
    this.enTitle = data.enTitle;
    this.description = data.description;
  }
}
