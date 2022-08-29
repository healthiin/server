import { ApiProperty } from '@nestjs/swagger';

import { Board } from '@domain/community/entities/board.entity';

export class BoardProfileResponse {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  description!: string | null;

  @ApiProperty()
  slug!: string | null;

  constructor(data: Board) {
    Object.assign(this, data);
  }
}
