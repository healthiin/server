import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEquipmentManualRequest {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsString()
  enTitle!: string;

  @IsNotEmpty()
  @IsString()
  type!: '등' | '팔' | '다리' | '가슴' | '복근' | '유산소' | '어깨' | '하체';

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
