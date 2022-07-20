import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserProfileUpdateRequest {
  @IsOptional()
  @IsString()
  username!: string;

  @IsOptional()
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  nickname!: string;

  @IsOptional()
  @IsString()
  avatarImage!: string;

  @IsOptional()
  @IsString()
  phoneNumber!: string;
}
