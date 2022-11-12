import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ReportCreateRequest {
  @ApiProperty({ description: '기준 연도' })
  @IsNotEmpty()
  @IsNumber()
  year: number;

  @ApiProperty({ description: '기준 주차' })
  @IsNotEmpty()
  @IsNumber()
  week: number;
}
