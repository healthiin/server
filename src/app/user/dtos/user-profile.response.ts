import { ApiProperty } from '@nestjs/swagger';

import { User } from '@domain/user/user.entity';

export class UserProfileResponse {
  @ApiProperty() private id!: string;
  @ApiProperty() private username!: string;
  @ApiProperty() private name!: string;
  @ApiProperty() private nickname!: string;
  @ApiProperty({ nullable: true }) private avatarImage!: string | null;
  @ApiProperty() private phoneNumber!: string;

  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.name = user.name;
    this.nickname = user.nickname;
    this.avatarImage = user.avatarImage;
    this.phoneNumber = user.phoneNumber;
  }
}
