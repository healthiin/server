import { Entity, ManyToOne } from 'typeorm';

import { Gym } from '@domain/gym/gym.entity';
import { User } from '@domain/user/user.entity';

@Entity('managers')
export class Manager extends User {
  @ManyToOne(() => Gym, (gym) => gym.id)
  ManagingGyms: Gym;
}
