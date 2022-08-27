import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class NoticeCreateRequest {
  @IsNotEmpty()
  @IsString()
  contents!: string;

  @IsNotEmpty()
  @IsUUID()
  writer!: string;
}
