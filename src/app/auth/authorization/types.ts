import { InferSubjects } from '@casl/ability';

import { AppAbility } from '@app/auth/authorization/permission.factory';
import { Board } from '@domain/community/board.entity';
import { Comment } from '@domain/community/comment.entity';
import { Post } from '@domain/community/post.entity';
import { GymNotice } from '@domain/gym/entities/gym-notice.entity';
import { GymUser } from '@domain/gym/entities/gym-user.entity';
import { Gym } from '@domain/gym/entities/gym.entity';
import { User } from '@domain/user/user.entity';

const domains = [User, Board, Gym, GymNotice, GymUser, Post, Comment] as const;

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  ReadDetail = 'detail',
  Update = 'update',
  Delete = 'delete',
}

interface IPolicyHandler {
  handle(ability: AppAbility): boolean;
}

type PolicyHandlerCallback = (ability: AppAbility) => boolean;

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;
export type Subjects = InferSubjects<typeof domains[number]> | 'all';
