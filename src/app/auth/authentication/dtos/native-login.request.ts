import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { User } from '@domain/user/user.entity';

export class NativeLoginRequest implements Pick<User, 'username' | 'password'> {
  @ApiProperty({})
  @IsNotEmpty()
  @IsString()
  username!: string;

  @ApiProperty({})
  @IsNotEmpty()
  @IsString()
  password!: string;
}
