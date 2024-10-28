import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import CreateUserDTO from './dto/create-user.dto';
import ListUserDTO from './dto/list-user.dto';
import UpdateUserDTO from './dto/update-user.dto';
import UserEntity from './user.entity';
import UserRepository from './user.repository';

@Controller('/users')
class UserController {
  constructor(private userRepository: UserRepository) {}

  @Get()
  async getUsers(): Promise<ListUserDTO[]> {
    const users = await this.userRepository.getUsers();
    const userMapper = users.map((user) => new ListUserDTO(user.id, user.name, user.email));
    return userMapper;
  }

  @Post()
  async createUser(@Body() userData: CreateUserDTO) {
    const user = new UserEntity();
    user.email = userData.email;
    user.password = userData.password;
    user.name = userData.name;
    user.active = true;
    user.id = uuid();
    this.userRepository.createUser(user);
    return new ListUserDTO(user.id, user.name, user.email);
  }

  @Patch('/:id')
  async updateUser(@Body() userData: UpdateUserDTO, @Param('id') id: string) {
    const updatedUser = await this.userRepository.updateUser(id, userData);
    return new ListUserDTO(id, updatedUser.name, updatedUser.email);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    await this.userRepository.deleteUser(id);
    return { message: 'Usuário removido' };
  }
}

export default UserController;
