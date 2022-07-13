import { User } from '@app/user/domain/user.entity';

export class UserProfileResponse {
  private id!: string;
  private username!: string;
  private name!: string;
  private nickname!: string;
  private avatarImage!: string | null;
  private phoneNumber!: string;

  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.name = user.name;
    this.nickname = user.nickname;
    this.avatarImage = user.avatarImage;
    this.phoneNumber = user.phoneNumber;
  }
}
