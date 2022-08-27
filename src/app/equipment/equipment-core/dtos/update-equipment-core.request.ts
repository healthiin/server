import { IsOptional, IsString } from 'class-validator';

export class UpdateEquipmentCoreRequest {
  @IsOptional()
  @IsString()
  name?: string | null;

  @IsOptional()
  @IsString()
  description?: string | null;
}
