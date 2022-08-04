import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';

import { GymCreateRequest } from '@app/gym/dtos/gym-create.request';
import { NoticeCreateRequest } from '@app/gym/dtos/notice-create.request';
import { NoticeLogResponse } from '@app/gym/dtos/notice-log.response';
import { GymService } from '@app/gym/gym.service';
import { UserPreviewProfileResponse } from '@app/user/dtos/user-preview-profile-response';

@Controller('gyms')
export class GymController {
  constructor(private readonly gymService: GymService) {}

  @Post('/:managerId')
  async joinGym(
    @Param('managerId', ParseUUIDPipe) managerId: string,
    @Body() data: GymCreateRequest,
  ): Promise<string> {
    return this.gymService.joinGym(managerId, data);
  }

  @Post('/notice/:id')
  async noticeToMembers(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: NoticeCreateRequest,
  ): Promise<boolean> {
    return this.gymService.noticeToMembers(id, data);
  }

  @Get('/:id')
  async getMembers(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<UserPreviewProfileResponse[]> {
    return this.gymService.getMembers(id);
  }

  @Get('/notice/:id')
  async getNoticeLog(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<NoticeLogResponse[]> {
    return this.gymService.getNoticeLog(id);
  }
}
