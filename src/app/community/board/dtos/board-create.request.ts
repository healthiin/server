import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { BoardCreateCommand } from '@app/community/board/board.command';

export class BoardCreateRequest implements BoardCreateCommand {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  slug?: string;
}
