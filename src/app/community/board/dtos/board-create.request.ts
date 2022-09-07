import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { BoardCreateCommand } from '@app/community/board/board.command';

export class BoardCreateRequest implements BoardCreateCommand {
  @ApiProperty({ description: '게시판 이름' })
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiPropertyOptional({ description: '게시판 설명' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: '게시판 짧은 주소' })
  @IsOptional()
  @IsString()
  slug?: string;
}
