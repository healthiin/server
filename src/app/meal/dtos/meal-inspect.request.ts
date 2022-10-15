import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class MealInspectRequest {
  @IsOptional()
  @ApiProperty({ type: 'string', format: 'binary', description: '음식 사진' })
  file!: Buffer;
}
