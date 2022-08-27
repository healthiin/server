import { IsNotEmpty, IsString } from 'class-validator';

import { Manual } from '@domain/manual/manual.entity';
import { User } from '@domain/user/user.entity';

export class GymCreateRequest {
  @IsNotEmpty()
  @IsString()
  gymName!: string;

  @IsNotEmpty()
  @IsString()
  address!: string;

  @IsNotEmpty()
  @IsString()
  franchise: string | null;

  @IsNotEmpty()
  equipments: Manual[];

  @IsNotEmpty()
  registeredUsers: User[];

  @IsNotEmpty()
  @IsString()
  gymInfo!: string;
}
