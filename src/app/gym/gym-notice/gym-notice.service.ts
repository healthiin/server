import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';

import { GymNoticeProfileResponse } from '@app/gym/gym-notice/dtos/gym-notice-profile.response';
import {
  GymNoticeCreateCommand,
  GymNoticeDeleteCommand,
  GymNoticeListQuery,
  GymNoticeQuery,
  GymNoticeUpdateCommand,
} from '@app/gym/gym-notice/gym-notice.command';
import { GymNotice } from '@domain/gym/entities/gym-notice.entity';
import { GymNoticeNotFoundException } from '@domain/gym/gym.errors';
import { Pagination } from '@infrastructure/types/pagination.types';

@Injectable()
export class GymNoticeService {
  constructor(
    @InjectRepository(GymNotice)
    private readonly gymNoticeRepository: Repository<GymNotice>,
  ) {}

  async searchNotice(
    data: GymNoticeListQuery,
  ): Promise<Pagination<GymNoticeProfileResponse>> {
    const queryBuilder = this.gymNoticeRepository.createQueryBuilder('notice');

    queryBuilder.where('notice.gymId = :gymId', { gymId: data.gymId });

    const { items, meta } = await paginate(queryBuilder, {
      page: data.page,
      limit: data.limit,
    });

    return {
      items: items.map((notice) => new GymNoticeProfileResponse(notice)),
      meta,
    };
  }

  async getNoticeById(data: GymNoticeQuery): Promise<GymNotice> {
    const notice = await this.gymNoticeRepository.findOne({
      where: {
        id: data.noticeId,
        gym: { id: data.gymId },
      },
    });

    if (!notice) throw new GymNoticeNotFoundException();
    return notice;
  }

  async createNotice(data: GymNoticeCreateCommand): Promise<GymNotice> {
    const { userId, gymId, ...profile } = data;

    return this.gymNoticeRepository.save({
      ...profile,
      author: { id: userId },
      gym: { id: gymId },
    });
  }

  async updateNoticeProfile(data: GymNoticeUpdateCommand): Promise<GymNotice> {
    const { noticeId, gymId, ...profile } = data;
    const notice = await this.getNoticeById({ gymId, noticeId });

    return this.gymNoticeRepository.save({ ...notice, ...profile });
  }

  async deleteNotice(data: GymNoticeDeleteCommand): Promise<boolean> {
    const { noticeId, gymId } = data;
    const notice = await this.getNoticeById({ noticeId, gymId });

    const { affected } = await this.gymNoticeRepository.softDelete({
      id: notice.id,
    });

    return affected > 0;
  }
}
