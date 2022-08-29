import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';

import { AuthenticatedUserData } from '@app/auth/authentication/commands/authenticated-user.data';
import { Action, Subjects } from '@app/auth/authorization/types';
import { Gym } from '@domain/gym/entities/gym.entity';
import { User } from '@domain/user/user.entity';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class PermissionFactory {
  private readonly builder!: AbilityBuilder<AppAbility>;

  constructor() {
    this.builder = new AbilityBuilder<AppAbility>(
      Ability as AbilityClass<AppAbility>,
    );
  }

  build(user: AuthenticatedUserData): AppAbility {
    return this.setDetailedPermissions(user).build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }

  private setDetailedPermissions(
    user: AuthenticatedUserData,
  ): AbilityBuilder<AppAbility> {
    this.builder.can(Action.Read, 'all');

    this.builder.can([Action.ReadDetail, Action.Update], User, {
      id: user.id,
    });

    this.builder.can([Action.Create], Gym);

    if (user.gyms.length > 0) {
      user.gyms.forEach(({ id, isAdmin }) => {
        if (isAdmin()) {
          this.builder.can([Action.Manage], Gym, { id });
        }
      });
    }

    return this.builder;
  }
}
