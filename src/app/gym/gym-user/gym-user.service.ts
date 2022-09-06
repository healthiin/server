import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';

import { GymCoreService } from '@app/gym/gym-core/gym-core.service';
import { GymUserProfileResponse } from '@app/gym/gym-user/dtos/gym-user-profile.response';
import { UserService } from '@app/user/user.service';
import { GymUser } from '@domain/gym/entities/gym-user.entity';
import { Pagination } from '@infrastructure/types/pagination.types';

@Injectable()
export class GymUserService {
  constructor(
    @InjectRepository(GymUser)
    private readonly gymUserRepository: Repository<GymUser>,
    private readonly gymCoreService: GymCoreService,
    private readonly userService: UserService,
  ) {}

  async getUserList(
    gymId: string,
    page: number,
    limit: number,
  ): Promise<Pagination<GymUserProfileResponse>> {
    const queryBuilder = this.gymUserRepository.createQueryBuilder('gymUser');

    queryBuilder.leftJoinAndSelect('gymUser.user', 'user');

    const { items, meta } = await paginate(queryBuilder, {
      page,
      limit,
    });

    return {
      items: items.map((user) => new GymUserProfileResponse(user)),
      meta,
    };
  }

  async addUserToGym(
    gymId: string,
    userId: string,
  ): Promise<GymUserProfileResponse> {
    const [gym, user] = await Promise.all([
      this.gymCoreService.getGymById(gymId),
      this.userService.findById(userId),
    ]);

    const gymUser = await this.gymUserRepository.save({
      gym,
      user,
    });

    return new GymUserProfileResponse(gymUser);
  }

  async deleteUserFromGym(gymId: string, userId: string): Promise<boolean> {
    const [gym, user] = await Promise.all([
      this.gymCoreService.getGymById(gymId),
      this.userService.findById(userId),
    ]);

    const { affected } = await this.gymUserRepository.softDelete({
      gym: { id: gym.id },
      user: { id: user.id },
    });

    return affected > 0;
  }
}
