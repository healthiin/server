import { IsNotEmpty, IsString } from 'class-validator';

import { NicknameLength } from '@domain/user/user.errors';

export class UserCreateRequest {
  @IsNotEmpty()
  @IsString()
  username!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;

  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  @NicknameLength({ message: `닉네임 길이가 올바르지 않습니다.` })
  nickname!: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber!: string;
}
