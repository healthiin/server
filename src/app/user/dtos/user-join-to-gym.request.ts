import { IsNotEmpty, IsUUID } from 'class-validator';

export class UserJoinToGymRequest {
  @IsUUID()
  @IsNotEmpty()
  gymId!: string;

  @IsUUID()
  @IsNotEmpty()
  userId!: string;
}
