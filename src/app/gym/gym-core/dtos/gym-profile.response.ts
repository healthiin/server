import { ApiProperty } from '@nestjs/swagger';

import { Gym } from '@domain/gym/entities/gym.entity';

export class GymProfileResponse {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty({ nullable: true })
  description!: string | null;

  @ApiProperty({ nullable: true })
  location!: string | null;

  @ApiProperty({ nullable: true })
  contact!: string | null;

  constructor(data: Gym) {
    Object.assign(this, data);
  }
}
