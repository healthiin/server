import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';

import { CreateNoticeData } from '@app/gym/gym-notice/commands/create-notice.data';
import { UpdateNoticeData } from '@app/gym/gym-notice/commands/update-notice.data';
import { GymNoticeProfileResponse } from '@app/gym/gym-notice/dtos/gym-notice-profile.response';
import { GymNotice } from '@domain/gym/entities/gym-notice.entity';
import { GymNoticeNotFoundException } from '@domain/gym/gym.errors';
import { User } from '@domain/user/user.entity';
import { Pagination } from '@infrastructure/types/pagination.types';

@Injectable()
export class GymNoticeService {
  constructor(
    @InjectRepository(GymNotice)
    private readonly gymNoticeRepository: Repository<GymNotice>,
  ) {}

  async searchNotice(
    page: number,
    limit: number,
  ): Promise<Pagination<GymNoticeProfileResponse>> {
    const queryBuilder = this.gymNoticeRepository.createQueryBuilder('notice');

    const { items, meta } = await paginate(queryBuilder, {
      page,
      limit,
    });

    return {
      items: items.map((notice) => new GymNoticeProfileResponse(notice)),
      meta,
    };
  }

  async getNoticeProfile(id: string): Promise<GymNoticeProfileResponse> {
    const notice = await this.findById(id);
    return new GymNoticeProfileResponse(notice);
  }

  async createNotice(
    data: CreateNoticeData,
    user: User,
  ): Promise<GymNoticeProfileResponse> {
    const notice = await this.gymNoticeRepository.save({
      ...data,
      author: { id: user.id },
    });

    return new GymNoticeProfileResponse(notice);
  }

  async updateNoticeProfile(
    id: string,
    data: UpdateNoticeData,
  ): Promise<GymNoticeProfileResponse> {
    const notice = await this.findById(id);

    const updatedNotice = await this.gymNoticeRepository.save({
      ...notice,
      ...data,
    });

    return new GymNoticeProfileResponse(updatedNotice);
  }

  async deleteNotice(id: string): Promise<boolean> {
    const notice = await this.findById(id);

    const { affected } = await this.gymNoticeRepository.softDelete({
      id: notice.id,
    });

    return affected > 0;
  }

  async findById(
    id: string,
    select?: FindOptionsSelect<GymNotice>,
  ): Promise<GymNotice> {
    const notice = await this.gymNoticeRepository.findOne({
      where: { id },
      select,
    });

    if (!notice) throw new GymNoticeNotFoundException();

    return notice;
  }
}
