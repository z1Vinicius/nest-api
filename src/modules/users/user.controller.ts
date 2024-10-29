import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import CreateUserDTO from './dto/create-user.dto';
import ListUserDTO from './dto/list-user.dto';
import UpdateUserDTO from './dto/update-user.dto';
import UserEntity from './entities/user.entity';
import UserRepository from './user.repository';
import UserService from './user.service';

@Controller('/users')
class UserController {
  constructor(
    private userRepository: UserRepository,
    private userService: UserService,
  ) {}

  @Get()
  async getUsers(): Promise<ListUserDTO[]> {
    const users = await this.userService.listUsers();
    return users;
  }

  @Post()
  async createUser(@Body() userData: CreateUserDTO) {
    const user = new UserEntity(userData.name, userData.email, userData.password, true);
    const createUser = await this.userService.createUser(user);
    return new ListUserDTO(createUser.id, createUser.name, createUser.email);
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
