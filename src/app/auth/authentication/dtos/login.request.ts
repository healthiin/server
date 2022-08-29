import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginRequest {
  @ApiProperty({
    example: 'admin',
    description: '아이디',
  })
  @IsNotEmpty()
  @IsString()
  username!: string;

  @ApiProperty({
    example: 'SecretPassword123!',
    description: '비밀번호',
  })
  @IsNotEmpty()
  @IsString()
  password!: string;
}
