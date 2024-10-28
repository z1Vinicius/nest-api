import { Injectable } from '@nestjs/common';
import UpdateUserDTO from './dto/update-user.dto';
import UserEntity from './user.entity';

@Injectable()
class UserRepository {
  private users: UserEntity[] = [];

  public async createUser(user: UserEntity) {
    this.users.push(user);
  }

  public async findUser(id: string) {
    const findUser = this.users.find((user) => user.id === id);
    if (!findUser) {
      throw new Error('Usuário não encontrado');
    }
    return findUser;
  }

  public async updateUser(id: string, user: Partial<UserEntity>): Promise<UpdateUserDTO> {
    const findUser = this.users.find((user) => user.id === id);
    if (!findUser) {
      throw new Error('Usuário não encontrado');
    }

    Object.entries(user).forEach(([key, value]) => {
      if (key === 'id') {
        return;
      }
      findUser[key] = value;
    });
    findUser;

    return findUser;
  }

  public async deleteUser(id: string) {
    const findUser = await this.findUser(id);
    this.users = this.users.filter((user) => user.id !== findUser.id);
  }

  public async getUsers(): Promise<UserEntity[]> {
    return this.users;
  }

  async hasEmailRegistered(email: string): Promise<boolean> {
    const hasEmailRegistered = this.users.some((user) => user.email === email);
    return hasEmailRegistered;
  }
}

export default UserRepository;
