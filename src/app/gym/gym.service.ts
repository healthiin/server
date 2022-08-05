import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';

import { CreateGymData } from '@app/gym/commands/create-gym.data';
import { UpdateGymData } from '@app/gym/commands/update-gym.data';
import { GymProfileResponse } from '@app/gym/dtos/gym-profile.response';
import { GymUser, GymUserRole } from '@domain/gym/entities/gym-user.entity';
import { Gym } from '@domain/gym/entities/gym.entity';
import { GymNotFoundException } from '@domain/gym/gym.errors';
import { User } from '@domain/user/user.entity';
import { Pagination } from '@infrastructure/types/pagination.types';

@Injectable()
export class GymService {
  constructor(
    @InjectRepository(Gym)
    private readonly gymRepository: Repository<Gym>,
    @InjectRepository(GymUser)
    private readonly gymUserRepository: Repository<GymUser>,
  ) {}

  async searchGym(
    page: number,
    limit: number,
  ): Promise<Pagination<GymProfileResponse>> {
    const queryBuilder = this.gymRepository.createQueryBuilder('gym');

    const { items, meta } = await paginate(queryBuilder, {
      page,
      limit,
    });

    return {
      items: items.map((gym) => new GymProfileResponse(gym)),
      meta,
    };
  }

  async getGymProfile(id: string): Promise<GymProfileResponse> {
    const gym = await this.findById(id);
    return new GymProfileResponse(gym);
  }

  async createGym(
    data: CreateGymData,
    user: User,
  ): Promise<GymProfileResponse> {
    const gym = await this.gymRepository.save(data);

    await this.gymUserRepository.save({
      gym: { id: gym.id },
      user: { id: user.id },
      role: GymUserRole.OWNER,
    });

    return new GymProfileResponse(gym);
  }

  async updateGymProfile(
    id: string,
    data: UpdateGymData,
  ): Promise<GymProfileResponse> {
    const gym = await this.findById(id);

    const updatedGym = await this.gymRepository.save({
      ...gym,
      ...data,
    });

    return new GymProfileResponse(updatedGym);
  }

  async deleteGym(id: string): Promise<boolean> {
    const gym = await this.findById(id);
    const { affected } = await this.gymRepository.softDelete({ id: gym.id });
    return affected > 0;
  }

  async findById(id: string, select?: FindOptionsSelect<Gym>): Promise<Gym> {
    const gym = await this.gymRepository.findOne({
      where: { id },
      select,
    });

    if (!gym) throw new GymNotFoundException();

    return gym;
  }
}