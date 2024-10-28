import { Injectable } from '@nestjs/common';

@Injectable()
class UserRepository {
  private users = [];

  public async saveUser(user) {
    this.users.push(user);
  }

  public async getUsers() {
    return this.users;
  }
}

export default UserRepository;
