import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UserUpdateRequest {
  @ApiProperty({
    example: 'id123123',
    description: '아이디',
  })
  @IsOptional()
  @IsString()
  username!: string;

  @ApiProperty({
    example: '홍길동',
    description: '본명',
  })
  @IsOptional()
  @IsString()
  name!: string;

  @ApiProperty({ example: '파이팅하는 무지', description: '닉네임' })
  @IsOptional()
  @IsString()
  nickname!: string;

  @ApiProperty({ description: '프로필 이미지' })
  @IsOptional()
  @IsString()
  avatarImage!: string;

  @ApiProperty({ example: '01012341234', description: '전화번호' })
  @IsOptional()
  @IsString()
  phoneNumber!: string;
}
