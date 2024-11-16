import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getUser(id: string): Promise<UserEntity | null> {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async getUserByEmail(email: string): Promise<UserEntity | null> {
    return await this.userRepository.findOne({ where: { email: email } });
  }

  async listUsers(): Promise<ListUserDTO[]> {
    const userQuery = await this.userRepository.find();
    const users: ListUserDTO[] = userQuery.map((user) => new ListUserDTO(user.id, user.name, user.email));
    return users;
  }

  async createUser(userData: CreateUserDTO): Promise<UserEntity> {
    const user = new UserEntity();
    Object.assign(user, userData as UserEntity);
    console.table(user)
    console.log(this.userRepository)
    await this.userRepository.save(user);
    return user;
  }

  async delete(id: string) {
    await this.userRepository.delete(id);
  }

  async updateUser(id: string, userData: UpdateUserDTO): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: id });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    Object.assign(user, userData as UpdateUserDTO);
    await this.userRepository.update(id, user);
    return user;
  }
}

export default UserService;
