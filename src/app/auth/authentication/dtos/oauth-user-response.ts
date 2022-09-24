import { ApiProperty } from '@nestjs/swagger';

import { User } from '@domain/user/user.entity';

export class OAuthUserResponse {
  @ApiProperty() private id: string;
  @ApiProperty() private createdAt: Date;
  @ApiProperty() private updatedAt: Date;

  get isFreshman(): boolean {
    return this.createdAt === this.updatedAt;
  }

  constructor(user: User) {
    this.id = user.id;
  }
}
