import { ApiProperty } from '@nestjs/swagger';

import { UserCreateData } from '@app/user/commands/user-create.data';

export class UserKakaoResponse {
  @ApiProperty() username!: string;
  @ApiProperty({ nullable: true }) gender!: string | null;
  @ApiProperty({ nullable: true }) ageRange!: string | null;
  @ApiProperty({ nullable: true }) email!: string | null;

  constructor(user: UserCreateData) {
    this.username = user.username;
    this.gender = user.gender;
    this.ageRange = user.ageRange;
    this.email = user.userEmail;
  }
}
