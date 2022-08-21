import { IsNotEmpty, IsString } from 'class-validator';

export class PostCreateRequest {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsString()
  content!: string;
}
