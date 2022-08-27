import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GymUser, GymUserRole } from '@domain/gym/entities/gym-user.entity';
import { GymCreatedEvent } from '@domain/gym/events/gym-created.event';
import { Events } from '@infrastructure/events';

@Injectable()
export class GymCreatedListener {
  constructor(
    @InjectRepository(GymUser)
    private readonly gymUserRepository: Repository<GymUser>,
  ) {}

  @OnEvent(Events.GYM_CREATED)
  async handle(payload: GymCreatedEvent): Promise<GymUser> {
    return this.gymUserRepository.save({
      gym: { id: payload.gymId },
      user: { id: payload.ownerId },
      role: GymUserRole.OWNER,
    });
  }
}
