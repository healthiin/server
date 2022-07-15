import { IsNotEmpty, IsString } from 'class-validator';

export class UserProfileUpdateRequest {
  @IsNotEmpty()
  @IsString()
  username!: string;

  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  nickname!: string;

  @IsNotEmpty()
  @IsString()
  avatarImage!: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber!: string;
}
