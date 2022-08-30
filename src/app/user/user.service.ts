import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { Repository } from 'typeorm';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';

import { AuthenticatedUserData } from '@app/auth/authentication/commands/authenticated-user.data';
import { UserCreateData } from '@app/user/commands/user-create.data';
import { UserProfileUpdateRequest } from '@app/user/dtos/user-profile-update.request';
import { UserProfileResponse } from '@app/user/dtos/user-profile.response';
import {
  DuplicatedNicknameException,
  DuplicatedUsernameException,
  UserNotFoundException,
} from '@domain/errors/user.errors';
import { Gym } from '@domain/gym/entities/gym.entity';
import { User } from '@domain/user/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Gym)
    private readonly gymRepository: Repository<Gym>,
    private readonly configService: ConfigService,
  ) {}

  async createUser(data: UserCreateData): Promise<UserProfileResponse> {
    await Promise.all([
      this.validateUsername(data.username),
      this.validateNickname(data.nickname),
    ]);

    const { password, ...profile } = data;

    const user = await this.userRepository.save({
      ...profile,
      password: await this.hashPassword(password),
    });

    return new UserProfileResponse(user);
  }

  async getUserProfile(id: string): Promise<UserProfileResponse> {
    const user = await this.findById(id);
    return new UserProfileResponse(user);
  }

  async updateUserProfile(
    id: string,
    data: UserProfileUpdateRequest,
  ): Promise<UserProfileResponse> {
    if (data.username) await this.validateUsername(data.username);
    if (data.nickname) await this.validateNickname(data.nickname);

    const user = await this.findById(id);

    const updatedUser = await this.userRepository.save({
      ...user,
      ...data,
    });

    return new UserProfileResponse(updatedUser);
  }

  async updateUserPassword(
    id: string,
    password: string,
  ): Promise<UserProfileResponse> {
    const user = await this.findById(id);

    const updatedUser = await this.userRepository.save({
      ...user,
      password: await this.hashPassword(password),
    });

    return new UserProfileResponse(updatedUser);
  }

  async withdrawUser(id: string): Promise<boolean> {
    const user = await this.findById(id);
    const { affected } = await this.userRepository.softDelete(user.id);
    return affected > 0;
  }

  async findById(id: string, select?: FindOptionsSelect<User>): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      select,
    });
    if (!user) throw new UserNotFoundException();
    return user;
  }

  async findByUsername(
    username: string,
    select?: FindOptionsSelect<User>,
  ): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { username },
      select,
    });
    if (!user) throw new UserNotFoundException();
    return user;
  }

  async getUserForAuthentication(id: string): Promise<AuthenticatedUserData> {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .leftJoinAndSelect('user.gyms', 'gyms')
      .leftJoinAndSelect('gyms.gym', 'gym')
      .getOne();
  }

  protected async validateUsername(username: string): Promise<void> {
    const count = await this.userRepository.count({ where: { username } });
    if (count > 0) throw new DuplicatedUsernameException();
  }

  protected async validateNickname(nickname: string): Promise<void> {
    const count = await this.userRepository.count({ where: { nickname } });
    if (count > 0) throw new DuplicatedNicknameException();
  }

  protected async hashPassword(password: string): Promise<string> {
    const secret = Buffer.from(
      this.configService.get<string>('APP_SECRET', ''),
    );
    return argon2.hash(password, { secret });
  }
}
