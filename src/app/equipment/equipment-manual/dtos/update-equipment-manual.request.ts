import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateEquipmentManualRequest {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  enTitle?: string;

  @IsOptional()
  @IsNumber()
  difficulty?: number;

  @IsOptional()
  @IsString()
  description?: string | null;

  @IsOptional()
  @IsString()
  precautions?: string | null;
}
