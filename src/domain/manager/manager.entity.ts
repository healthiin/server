import { Entity, ManyToOne } from 'typeorm';

import { UserAbstract } from '@domain/abstract/user.abstract.entity';
import { Gym } from '@domain/gym/gym.entity';

@Entity('managers')
export class Manager extends UserAbstract {
  @ManyToOne(() => Gym, (gym) => gym.id)
  ManagingGyms: Gym | null;
}
