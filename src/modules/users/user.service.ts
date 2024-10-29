import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ListUserDTO from './dto/list-user.dto';
import UserEntity from './entities/user.entity';

@Injectable()
class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUser(id: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { email: email } });
  }

  async listUsers(): Promise<ListUserDTO[]> {
    const userQuery = await this.userRepository.find();
    const users: ListUserDTO[] = userQuery.map((user) => new ListUserDTO(user.id, user.name, user.email));
    return users;
  }

  async createUser(user: UserEntity): Promise<UserEntity> {
    return await this.userRepository.save(user);
  }

  async delete(id: string) {
    await this.userRepository.delete(id);
  }

  async updateUser(id: string, user: UserEntity) {
    return await this.userRepository.update(id, user);
  }
}

export default UserService;
