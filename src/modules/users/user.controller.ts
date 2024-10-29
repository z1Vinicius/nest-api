import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import CreateUserDTO from './dto/create-user.dto';
import ListUserDTO from './dto/list-user.dto';
import UpdateUserDTO from './dto/update-user.dto';
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
  async createUser(@Body() userData: CreateUserDTO): Promise<ListUserDTO> {
    return await this.userService.createUser(userData);
  }

  @Put('/:id')
  async updateUser(@Body() userData: UpdateUserDTO, @Param('id') id: string) {
    return this.userService.updateUser(id, userData);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    await this.userService.delete(id);
    return { message: 'Usuário removido' };
  }
}

export default UserController;
