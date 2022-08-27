import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { Manual } from '@domain/manual/manual.entity';

export class ManualResponse {
  @IsNotEmpty()
  @IsString()
  id!: string;

  @IsNotEmpty()
  @IsString()
  enTitle!: string;

  @IsNotEmpty()
  @IsString()
  title!: string;

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

  constructor(manual: Manual) {
    this.id = manual.id;
    this.title = manual.title;
    this.enTitle = manual.enTitle;
    this.type = manual.type;
    this.difficulty = manual.difficulty;
    this.description = manual.description;
    this.precautions = manual.precautions;
  }
}
