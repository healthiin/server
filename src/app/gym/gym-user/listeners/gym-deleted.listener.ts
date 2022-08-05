import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GymUser } from '@domain/gym/entities/gym-user.entity';
import { GymDeletedEvent } from '@domain/gym/events/gym-deleted.event';
import { Events } from '@infrastructure/events';

@Injectable()
export class GymDeletedListener {
  constructor(
    @InjectRepository(GymUser)
    private readonly gymUserRepository: Repository<GymUser>,
  ) {}

  @OnEvent(Events.GYM_DELETED)
  async handle(payload: GymDeletedEvent): Promise<boolean> {
    const { affected } = await this.gymUserRepository.softDelete({
      gym: { id: payload.gymId },
    });

    return affected > 0;
  }
}
