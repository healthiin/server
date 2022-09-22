import { ApiProperty } from '@nestjs/swagger';

import { GymUser, GymUserRole } from '@domain/gym/entities/gym-user.entity';

export class GymUserProfileResponse {
  @ApiProperty() private id!: string;
  @ApiProperty() private name!: string;
  @ApiProperty() private avatarImage!: string | null;
  @ApiProperty() private role!: GymUserRole;
  @ApiProperty() private createdAt!: Date;

  constructor(data: GymUser) {
    this.id = data.user.id;
    this.name = data.user.name;
    this.avatarImage = data.user.avatarImage;
    this.role = data.role;
    this.createdAt = data.createdAt;
  }
}
