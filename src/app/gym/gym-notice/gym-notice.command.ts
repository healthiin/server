import { GymNoticeProperties } from '@domain/gym/entities/gym-notice';

type GymInfo = { gymId: string };
type GymNoticeInfo = { noticeId: string };
type UserInfo = { userId: string };

export type GymNoticeQuery = GymInfo & GymNoticeInfo;

export type GymNoticeListQuery = GymInfo & {
  page: number;
  limit: number;
};

export type GymNoticeCreateCommand = GymInfo &
  UserInfo &
  Pick<GymNoticeProperties, 'title' | 'body'>;

export type GymNoticeUpdateCommand = GymInfo &
  GymNoticeInfo &
  Partial<Pick<GymNoticeProperties, 'title' | 'body'>>;

export type GymNoticeDeleteCommand = GymInfo & GymNoticeInfo;
