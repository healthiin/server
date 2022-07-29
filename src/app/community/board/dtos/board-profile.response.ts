import { ApiProperty } from '@nestjs/swagger';

import { Board } from '@domain/community/entities/board.entity';

export class BoardProfileResponse {
  @ApiProperty() private id!: string;
  @ApiProperty() private title!: string;
  @ApiProperty() private description!: string | null;
  @ApiProperty() private slug!: string | null;

  constructor(data: Board) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.slug = data.slug;
  }
}
