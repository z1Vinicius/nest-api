import { Body, Controller, Get, Post } from '@nestjs/common';
import CreateUserDTO from './dto/create-user.dto';
import UserRepository from './user.repository';

@Controller('/users')
class UserController {
  constructor(private userRepository: UserRepository) {}

  @Get()
  async getUsers() {
    return this.userRepository.getUsers();
  }

  @Post()
  async createUser(@Body() userData: CreateUserDTO) {
    this.userRepository.saveUser(userData);
    return userData;
  }
}

export default UserController;
