import { ApiProperty } from '@nestjs/swagger';

import { Gym } from '@domain/gym/entities/gym.entity';

export class GymProfileResponse {
  @ApiProperty() private id!: string;
  @ApiProperty() private name!: string;
  @ApiProperty({ nullable: true }) private description!: string | null;
  @ApiProperty({ nullable: true }) private location!: string | null;
  @ApiProperty({ nullable: true }) private contact!: string | null;
  @ApiProperty() private createdAt!: Date;
  @ApiProperty() private updatedAt!: Date;

  constructor(data: Gym) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.location = data.location;
    this.contact = data.contact;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
