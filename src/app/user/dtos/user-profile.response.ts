import { ApiProperty } from '@nestjs/swagger';

import { User } from '@domain/user/user.entity';

export class UserProfileResponse {
  @ApiProperty({})
  private id!: string;

  @ApiProperty({
    example: 'id123123',
    description: '아이디',
  })
  private username!: string;

  @ApiProperty({
    example: '홍길동',
    description: '본명',
  })
  private name!: string;

  @ApiProperty({ example: '파이팅하는 무지', description: '닉네임' })
  private nickname!: string;

  @ApiProperty({ description: '프로필 이미지' })
  private avatarImage!: string | null;

  @ApiProperty({ example: '01012341234', description: '전화번호' })
  private phoneNumber!: string;

  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.name = user.name;
    this.nickname = user.nickname;
    this.avatarImage = user.avatarImage;
    this.phoneNumber = user.phoneNumber;
  }
}
