import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserEntity from './entities/user.entity';
import UserController from './user.controller';
import UserService from './user.service';
import RequireUserValidator from './validation/require-user.validator';
import UniqueEmailValidator from './validation/unique-email.validator';

@Module({
  controllers: [UserController],
  providers: [UserService, UniqueEmailValidator, RequireUserValidator],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  exports: [UserService],
})
class UserModule {}

export default UserModule;
