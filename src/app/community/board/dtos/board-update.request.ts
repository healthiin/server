import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { BoardUpdateCommand } from '@app/community/board/board.command';

export class BoardUpdateRequest implements BoardUpdateCommand {
  @ApiPropertyOptional({ description: '게시판 이름' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ description: '게시판 설명' })
  @IsOptional()
  @IsString()
  description?: string | null;

  @ApiPropertyOptional({ description: '게시판 짧은 주소' })
  @IsOptional()
  @IsString()
  slug?: string | null;
}
