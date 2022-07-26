import { IsNotEmpty, IsString } from 'class-validator';

export class ArticleCreateRequest {
  @IsNotEmpty()
  @IsString()
  username!: string;

  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsString()
  category!: 'general' | 'question' | 'record' | 'information';

  @IsNotEmpty()
  @IsString()
  contents!: string;

  @IsNotEmpty()
  @IsString()
  thumbnail!: string;
}
