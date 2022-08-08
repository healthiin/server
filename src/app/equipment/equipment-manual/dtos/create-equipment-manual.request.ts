import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

import { EquipmentManualType } from '@domain/equipment/entities/equipment-manual.entity';

export class CreateEquipmentManualRequest {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsString()
  enTitle!: string;

  @IsNotEmpty()
  @IsString()
  type!: EquipmentManualType;

  @IsNotEmpty()
  @IsNumber()
  difficulty!: number;

  @IsOptional()
  @IsString()
  description: string | null;

  @IsOptional()
  @IsString()
  precautions: string | null;
}
