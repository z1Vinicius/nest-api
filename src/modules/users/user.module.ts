import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DefaultAdminModule, DefaultAdminSite } from 'nestjs-admin';
import UserEntity from './entities/user.entity';
import UserController from './user.controller';
import UserService from './user.service';
import RequireUserValidator from './validation/require-user.validator';
import UniqueEmailValidator from './validation/unique-email.validator';

@Module({
  controllers: [UserController],
  providers: [UserService, UniqueEmailValidator, RequireUserValidator],
  imports: [TypeOrmModule.forFeature([UserEntity]), DefaultAdminModule, DefaultAdminModule],
  exports: [UserService],
})
class UserModule {
  constructor(private readonly adminSite: DefaultAdminSite) {
    adminSite.register('User', UserEntity);
  }
}

export default UserModule;
