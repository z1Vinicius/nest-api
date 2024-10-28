import { Module } from '@nestjs/common';
import UserController from './user.controller';
import UserRepository from './user.repository';

@Module({
  controllers: [UserController],
  providers: [UserRepository],
  imports: [],
})
class UserModule {}

export default UserModule;
