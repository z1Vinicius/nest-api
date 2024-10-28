import { Injectable } from '@nestjs/common';
import UsersEntity from './user.entity';

@Injectable()
class UserRepository {
  private users: UsersEntity[] = [];

  public async createUser(user: UsersEntity) {
    this.users.push(user);
  }

  public async getUsers(): Promise<UsersEntity[]> {
    return this.users;
  }

  async hasEmailRegistered(email: string): Promise<boolean> {
    const hasEmailRegistered = this.users.some((user) => user.email === email);
    return hasEmailRegistered;
  }
}

export default UserRepository;
