import { ApiProperty } from '@nestjs/swagger';

import { User } from '@domain/user/user.entity';

export class UserProfileResponse {
  @ApiProperty() private id!: string;
  @ApiProperty() private username!: string;
  @ApiProperty({ nullable: true }) private nickname!: string | null;
  @ApiProperty({ nullable: true }) private ageRange!: string | null;
  @ApiProperty({ nullable: true }) private gender!: string | null;
  @ApiProperty({ nullable: true }) private avatarImage!: string | null;
  @ApiProperty({ nullable: true }) private userEmail!: string | null;
  @ApiProperty() private createdAt: Date;
  @ApiProperty() private updatedAt: Date;

  public get isFreshman(): boolean {
    return this.createdAt === this.updatedAt;
  }

  public get getUserId(): string {
    return this.id;
  }

  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.nickname = user.nickname;
    this.ageRange = user.ageRange;
    this.gender = user.gender;
    this.userEmail = user.userEmail;
    this.avatarImage = user.avatarImage;
  }
}
