import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { Manual } from '@domain/manual/manual.entity';

export class ManualPreviewResponse {
  @IsNotEmpty()
  @IsString()
  id!: string;

  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsString()
  type!: 'back' | 'shoulder' | 'chest' | 'arm' | 'lef' | 'abs';

  @IsNotEmpty()
  @IsNumber()
  difficulty!: number;

  constructor(manual: Manual) {
    this.id = manual.id;
    this.title = manual.title;
    this.type = manual.type;
    this.difficulty = manual.difficulty;
  }
}
