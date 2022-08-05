import { ApiProperty } from '@nestjs/swagger';

import { GymNotice } from '@domain/gym/entities/gym-notice.entity';

export class GymNoticeProfileResponse {
  @ApiProperty() private id!: string;
  @ApiProperty() private title!: string;
  @ApiProperty() private body!: string;
  @ApiProperty() private author!: string;
  @ApiProperty() private createdAt!: Date;

  constructor(data: GymNotice) {
    this.id = data.id;
    this.title = data.title;
    this.body = data.body;
    this.author = data.author.nickname;
    this.createdAt = data.createdAt;
  }
}
