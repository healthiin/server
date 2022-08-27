import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEquipmentCoreRequest {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string | null;
}
