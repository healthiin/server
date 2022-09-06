import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';

import { GymProfileResponse } from '@app/gym/gym-core/dtos/gym-profile.response';
import {
  GymCreateCommand,
  GymListQuery,
  GymUpdateCommand,
} from '@app/gym/gym-core/gym-core.command';
import { Gym } from '@domain/gym/entities/gym.entity';
import { GymCreatedEvent } from '@domain/gym/events/gym-created.event';
import { GymDeletedEvent } from '@domain/gym/events/gym-deleted.event';
import { GymNotFoundException } from '@domain/gym/gym.errors';
import { Events } from '@infrastructure/events';
import { Pagination } from '@infrastructure/types/pagination.types';

@Injectable()
export class GymCoreService {
  constructor(
    @InjectRepository(Gym)
    private readonly gymRepository: Repository<Gym>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async searchGym(data: GymListQuery): Promise<Pagination<GymProfileResponse>> {
    const queryBuilder = this.gymRepository.createQueryBuilder('gym');

    const { items, meta } = await paginate(queryBuilder, {
      page: data.page,
      limit: data.limit,
    });

    return {
      items: items.map((gym) => new GymProfileResponse(gym)),
      meta,
    };
  }

  async getGymById(id: string): Promise<Gym> {
    const gym = await this.gymRepository.findOne({ where: { id } });

    if (!gym) throw new GymNotFoundException();
    return gym;
  }

  async createGym(data: GymCreateCommand): Promise<Gym> {
    const { userId, ...profile } = data;
    const gym = await this.gymRepository.save(profile);

    this.eventEmitter.emit(
      Events.GYM_CREATED,
      new GymCreatedEvent({ gymId: gym.id, ownerId: userId }),
    );

    return gym;
  }

  async updateGymProfile(id: string, data: GymUpdateCommand): Promise<Gym> {
    const gym = await this.getGymById(id);

    return this.gymRepository.save({ ...gym, ...data });
  }

  async deleteGym(id: string): Promise<boolean> {
    const gym = await this.getGymById(id);

    const { deletedAt } = await this.gymRepository.softRemove({ id: gym.id });

    if (!!deletedAt) {
      this.eventEmitter.emit(
        Events.GYM_DELETED,
        new GymDeletedEvent({ gymId: id }),
      );

      return true;
    }

    return false;
  }
}
