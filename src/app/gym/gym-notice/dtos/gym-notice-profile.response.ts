import { ApiProperty } from '@nestjs/swagger';

import { GymNotice } from '@domain/gym/entities/gym-notice.entity';

export class GymNoticeProfileResponse {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  body!: string;

  @ApiProperty()
  author!: string;

  @ApiProperty()
  createdAt!: Date;

  constructor(data: GymNotice) {
    Object.assign(this, data);
  }
}
