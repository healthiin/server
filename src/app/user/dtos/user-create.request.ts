import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { NicknameLength } from '@domain/user/user.errors';

export class UserCreateRequest {
  @ApiProperty({
    example: 'id123123',
    description: '아이디',
  })
  @IsNotEmpty()
  @IsString()
  username!: string;

  @ApiProperty({
    example: 'password123!',
    description: '비밀번호',
  })
  @IsNotEmpty()
  @IsString()
  password!: string;

  @ApiProperty({
    example: '홍길동',
    description: '본명',
  })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({ example: '파이팅하는 무지', description: '닉네임' })
  @IsNotEmpty()
  @IsString()
  @NicknameLength({ message: `닉네임 길이가 올바르지 않습니다.` })
  nickname!: string;

  @ApiProperty({ example: '01012341234', description: '전화번호' })
  @IsNotEmpty()
  @IsString()
  phoneNumber!: string;
}
