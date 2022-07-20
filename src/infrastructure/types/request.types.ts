import { Request as ExpressRequest } from 'express';

import { User } from '@domain/user/user.entity';

export type Request = ExpressRequest & {
  user: User;
};
