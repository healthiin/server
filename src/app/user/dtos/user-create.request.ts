import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { NicknameLength } from '@domain/user/user.errors';

export class UserCreateRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @NicknameLength({ message: `닉네임 길이가 올바르지 않습니다.` })
  nickname!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phoneNumber!: string;
}
