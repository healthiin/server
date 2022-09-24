import { ApiProperty } from '@nestjs/swagger';

import { User } from '@domain/user/user.entity';

export class UserProfileResponse {
  @ApiProperty() private id!: string;
  @ApiProperty() private username!: string;
  @ApiProperty({ nullable: true }) private nickname!: string | null;
  @ApiProperty({ nullable: true }) private avatarImage!: string | null;
  @ApiProperty() private isFreshman: boolean;
  @ApiProperty() private createdAt: Date;
  @ApiProperty() private updatedAt: Date;

  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.nickname = user.nickname;
    this.avatarImage = user.avatarImage;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.isFreshman = user.createdAt === user.updatedAt;
  }
}
