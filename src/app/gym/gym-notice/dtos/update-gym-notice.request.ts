import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { GymNoticeUpdateCommand } from '@app/gym/gym-notice/gym-notice.command';

export class UpdateGymNoticeRequest
  implements Pick<GymNoticeUpdateCommand, 'title' | 'body'>
{
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  body?: string;
}
