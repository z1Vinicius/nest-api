import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserEntity from './entities/user.entity';
import UserController from './user.controller';
import UserService from './user.service';
import RequireUserValidator from './validation/require-user.validator';
import UniqueEmailValidator from './validation/unique-email.validator';

// console.log('Mudou algo....');

@Module({
  controllers: [UserController],
  providers: [UserService, UniqueEmailValidator, RequireUserValidator],
  imports: [TypeOrmModule.forFeature([UserEntity])],
})
class UserModule {}

export default UserModule;
