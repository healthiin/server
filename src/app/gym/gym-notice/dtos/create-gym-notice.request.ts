import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { GymNoticeCreateCommand } from '@app/gym/gym-notice/gym-notice.command';

export class CreateGymNoticeRequest
  implements Pick<GymNoticeCreateCommand, 'title' | 'body'>
{
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  body!: string;
}
