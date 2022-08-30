import { ApiProperty } from '@nestjs/swagger';

import { Board } from '@domain/community/board.entity';

export class BoardProfileResponse {
  @ApiProperty()
  id!: string;

  @ApiProperty({ description: '게시판 이름' })
  title!: string;

  @ApiProperty({ description: '게시판 설명' })
  description!: string | null;

  @ApiProperty({ description: '게시판 짧은 주소' })
  slug!: string | null;

  constructor(data: Board) {
    Object.assign(this, data);
  }
}
