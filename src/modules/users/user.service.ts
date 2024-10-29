import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateUserDTO from './dto/create-user.dto';
import ListUserDTO from './dto/list-user.dto';
import UpdateUserDTO from './dto/update-user.dto';
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

  async createUser(userData: CreateUserDTO): Promise<UserEntity> {
    const user = new UserEntity(userData.name, userData.email, userData.password, true);
    await this.userRepository.save(user);
    return user;
  }

  async delete(id: string) {
    await this.userRepository.delete(id);
  }

  async updateUser(id: string, userData: UpdateUserDTO): Promise<UserEntity> {
    const user = new UserEntity(userData.name, userData.email, userData.password, true);
    await this.userRepository.update(id, user);
    return user;
  }
}

export default UserService;
