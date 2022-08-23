import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UserProfileUpdateRequest {
  @ApiProperty()
  @IsOptional()
  @IsString()
  username!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  nickname!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  avatarImage!: string;
}
