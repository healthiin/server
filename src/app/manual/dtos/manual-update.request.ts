import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ManualUpdateRequest {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsString()
  enTitle: string;

  @IsNotEmpty()
  @IsString()
  type!: 'back' | 'shoulder' | 'chest' | 'arm' | 'lef' | 'abs';

  @IsNotEmpty()
  @IsNumber()
  difficulty!: number;

  @IsNotEmpty()
  @IsString()
  description!: string;

  @IsNotEmpty()
  @IsString()
  precautions!: string;
}
