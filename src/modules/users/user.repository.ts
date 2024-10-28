import { Injectable } from '@nestjs/common';
import CreateUserDTO from './dto/create-user.dto';

@Injectable()
class UserRepository {
  private users: CreateUserDTO[] = [];

  public async saveUser(user) {
    this.users.push(user);
  }

  public async getUsers() {
    return this.users;
  }

  async hasEmailRegistered(email: string): Promise<boolean> {
    const hasEmailRegistered = this.users.some((user) => user.email === email);
    return hasEmailRegistered;
  }
}

export default UserRepository;
