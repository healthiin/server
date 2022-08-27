import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GymCreateData } from '@app/gym/commands/gym-create.data';
import { NoticeCreateRequest } from '@app/gym/dtos/notice-create.request';
import { NoticeLogResponse } from '@app/gym/dtos/notice-log.response';
import { UserPreviewProfileResponse } from '@app/user/dtos/user-preview-profile-response';
import { Gym } from '@domain/gym/gym.entity';
import { Notice } from '@domain/gym/notice.entity';
import { User } from '@domain/user/user.entity';

export class GymService {
  constructor(
    @InjectRepository(Gym)
    private readonly gymRepository: Repository<Gym>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Notice)
    private readonly noticeRepository: Repository<Notice>,
  ) {}

  async joinGym(managerId: string, gymData: GymCreateData): Promise<string> {
    const gym = await this.gymRepository.save({
      manager: managerId,
      ...gymData,
    });

    return gym.id;
  }

  async noticeToMembers(id, data: NoticeCreateRequest): Promise<boolean> {
    const users = await this.userRepository.findBy({
      registeredGym: { id },
    });
    await this.noticeRepository.save({
      reader: users,
      contents: data.contents,
      writer: { id: data.writer },
    });
    return true;
  }

  async getMembers(gymId: string): Promise<UserPreviewProfileResponse[]> {
    const users = await this.gymRepository.findOne({
      where: { id: gymId },
    });
    console.log(users.registeredUsers);
    return users.registeredUsers.map(
      (user) => new UserPreviewProfileResponse(user),
    );
  }

  async getNoticeLog(id: string): Promise<NoticeLogResponse[]> {
    const notices = await this.noticeRepository.findBy({ gym: { id } });

    return notices.map((notice) => new NoticeLogResponse(notice));
  }
}
