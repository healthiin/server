import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginRequest {
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
}
