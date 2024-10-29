import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserEntity from './entities/user.entity';
import UserController from './user.controller';
import UserRepository from './user.repository';
import UserService from './user.service';
import UniqueEmailValidator from './validation/unique-email.validator';

@Module({
  controllers: [UserController],
  providers: [UserRepository, UserService, UniqueEmailValidator],
  imports: [TypeOrmModule.forFeature([UserEntity])],
})
class UserModule {}

export default UserModule;
