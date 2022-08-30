import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEquipmentManualRequest {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsString()
  enTitle!: string;

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
