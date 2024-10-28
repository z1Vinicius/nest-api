import { Body, Controller, Get, Post } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import CreateUserDTO from './dto/create-user.dto';
import ListUserDTO from './dto/list-user.dto';
import UsersEntity from './user.entity';
import UserRepository from './user.repository';

@Controller('/users')
class UserController {
  constructor(private userRepository: UserRepository) {}

  @Get()
  async getUsers(): Promise<ListUserDTO[]> {
    const users = await this.userRepository.getUsers();
    const userMapper = users.map(
      (user) => new ListUserDTO(user.id, user.name, user.email),
    );
    return userMapper;
  }

  @Post()
  async createUser(@Body() userData: CreateUserDTO) {
    const user = new UsersEntity();
    user.email = userData.email;
    user.password = userData.password;
    user.name = userData.name;
    user.active = true;
    user.id = uuid();
    this.userRepository.createUser(user);
    return new ListUserDTO(user.id, user.name, user.email);
  }
}

export default UserController;
