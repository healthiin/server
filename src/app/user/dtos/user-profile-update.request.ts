import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UserProfileUpdateRequest {
  @ApiProperty({
    example: 'id123123',
    description: '아이디',
  })
  @IsOptional()
  @IsString()
  username!: string;

  @ApiProperty({ example: '파이팅하는 무지', description: '닉네임' })
  @IsOptional()
  @IsString()
  nickname!: string;

  @ApiProperty({ description: '프로필 이미지' })
  @IsOptional()
  @IsString()
  avatarImage!: string;
}
