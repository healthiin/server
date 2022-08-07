import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateEquipmentManualRequest {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  enTitle?: string;

  @IsOptional()
  @IsString()
  type?: '등' | '팔' | '다리' | '가슴' | '복근' | '유산소' | '어깨' | '하체';

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
