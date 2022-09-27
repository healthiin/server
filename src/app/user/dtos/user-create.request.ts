import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserCreateRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  email!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  age_range!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  gender!: string;
}
