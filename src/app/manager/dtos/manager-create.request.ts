import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ManagerCreateRequest {
  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 10)
  nickname!: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber!: string;
}
