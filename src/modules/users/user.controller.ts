import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { HashPasswordPipe } from 'src/pipes/hash-password';
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
  async createUser(@Body() userData: CreateUserDTO, @Body('password', HashPasswordPipe) password: string) {
    const createUser = await this.userService.createUser({ ...userData, password: password });
    return new ListUserDTO(createUser.id, createUser.name, createUser.email);
  }

  @Put('/:id')
  async updateUser(
    @Body() userData: UpdateUserDTO,
    @Param('id') id: string,
    @Body('password', HashPasswordPipe) password: string,
  ) {
    const user = await this.userService.updateUser(id, { ...userData, password: password });

    return new ListUserDTO(id, user.name, user.email);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    await this.userService.delete(id);
    return { message: 'Usuário removido' };
  }
}

export default UserController;
