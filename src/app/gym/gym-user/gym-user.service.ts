import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GymUser } from '@domain/gym/entities/gym-user.entity';

@Injectable()
export class GymUserService {
  constructor(
    @InjectRepository(GymUser)
    private readonly gymUserRepository: Repository<GymUser>,
  ) {}
}
