import { Gym } from '@domain/gym/gym.entity';
import { Notice } from '@domain/gym/notice.entity';
import { Manager } from '@domain/manager/manager.entity';
import { User } from '@domain/user/user.entity';

export class NoticeLogResponse {
  contents!: string;
  reader!: User[];
  writer!: Manager;
  gym: Gym;
  CreatedAt!: string;

  constructor(notice: Notice) {
    this.contents = notice.contents;
    this.reader = notice.reader;
    this.writer = notice.writer;
    this.CreatedAt = notice.CreatedAt;
  }
}
