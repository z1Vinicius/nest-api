import { Body, Controller, Get, Post } from '@nestjs/common';
import UserRepository from './user.repository';

@Controller('/users')
class UserController {
  constructor(private userRepository: UserRepository) {}

  @Get()
  async getUsers() {
    return this.userRepository.getUsers();
  }

  @Post()
  async createUser(@Body() userData: any) {
    this.userRepository.saveUser(userData);
    return userData;
  }
}

export default UserController;
