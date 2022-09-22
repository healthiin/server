import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserKakaoRequest {
  name: any;

  @IsOptional()
  @IsString()
  email: string | null;

  @IsOptional()
  @IsString()
  gender: string | null;

  @IsOptional()
  @IsString()
  age_range: string | null;
}
