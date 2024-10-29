import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import CreateUserDTO from './dto/create-user.dto';
import ListUserDTO from './dto/list-user.dto';
import UpdateUserDTO from './dto/update-user.dto';
import UserEntity from './entities/user.entity';
import UserService from './user.service';

@Controller('/users')
class UserController {
  constructor(private userService: UserService) {}

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

  @Put('/:id')
  async updateUser(@Body() userData: UpdateUserDTO, @Param('id') id: string) {
    const user = new UserEntity(userData.name, userData.email, userData.password, true);
    await this.userService.updateUser(id, user);
    return new ListUserDTO(id, user.name, user.email);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    await this.userService.delete(id);
    return { message: 'Usuário removido' };
  }
}

export default UserController;
