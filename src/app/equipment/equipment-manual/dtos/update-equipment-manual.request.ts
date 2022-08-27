import { IsNumber, IsOptional, IsString } from 'class-validator';

import { EquipmentManualType } from '@domain/equipment/entities/equipment-manual.entity';

export class UpdateEquipmentManualRequest {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  enTitle?: string;

  @IsOptional()
  @IsString()
  type?: EquipmentManualType;

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
