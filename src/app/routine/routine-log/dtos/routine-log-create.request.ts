import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { parse } from 'date-fns';

export class RoutineLogCreateRequest {
  @ApiProperty({ description: '루틴 아이디' })
  @IsNotEmpty()
  @IsUUID()
  routineId: string;

  @ApiProperty({ description: '매뉴얼 아이디' })
  @IsNotEmpty()
  @IsUUID()
  manualId: string;

  @ApiProperty({ description: '운동 시간' })
  @Transform(({ value }) => parse(value, 'yyyy-MM-dd HH:mm:ss', new Date()))
  @IsNotEmpty()
  @IsDate()
  startedAt: Date;

  @ApiProperty({ description: '운동 시간' })
  @Transform(({ value }) => parse(value, 'yyyy-MM-dd HH:mm:ss', new Date()))
  @IsNotEmpty()
  @IsDate()
  endedAt: Date;

  @ApiPropertyOptional({ description: '목표 횟수' })
  @IsOptional()
  @IsNumber()
  targetNumber?: number;

  @ApiPropertyOptional({ description: '실제 횟수' })
  @IsOptional()
  @IsNumber()
  setNumber?: number;

  @ApiPropertyOptional({ description: '무게' })
  @IsOptional()
  @IsNumber()
  weight?: number;

  @ApiPropertyOptional({ description: '속도' })
  @IsOptional()
  @IsNumber()
  speed?: number;

  @ApiPropertyOptional({ description: '운동 시간' })
  @IsOptional()
  @IsNumber()
  playMinute?: number;
}
