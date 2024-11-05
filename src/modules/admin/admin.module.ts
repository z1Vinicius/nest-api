// src/admin/admin.module.ts

import { Module } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import UserEntity from '../users/entities/user.entity';

interface CurrentAdmin {
  email: string;
  title?: string;
  avatarUrl?: string;
  id?: string;
  theme?: string;
  _auth?: Record<string, any>;
  [key: string]: any;
}

const authenticate = {
  inject: [getRepositoryToken(UserEntity)],
  useFactory: (userRepository: Repository<UserEntity>) => {
    return async function validateCredentials(email: string, password: string): Promise<CurrentAdmin | null> {
      const user = await userRepository.findOneBy({ email });
      if (user && password === user.password) {
        return { email: user.email, id: user.id };
      }
      return null;
    };
  },
};

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    (async () => {
      const AdminJs = await import('adminjs');
      const AdminJsTypeORM = await import('@adminjs/typeorm');
      const AdminJsNest = await import('@adminjs/nestjs');

      const Database = AdminJsTypeORM.Database;
      const Resource = AdminJsTypeORM.Resource;

      AdminJsTypeORM.Resource.validate = validate;
      AdminJs.default.registerAdapter({ Database, Resource });

      return AdminJsNest.default.AdminModule.createAdminAsync({
        useFactory: async (userRepository: Repository<UserEntity>) => ({
          adminJsOptions: {
            rootPath: '/admin',
            resources: [UserEntity],
          },
          //   auth: {
          //     authenticate: ,
          //     cookieName: 'adminjs',
          //     cookiePassword: 'secret',
          //   },
        }),
        inject: [TypeOrmModule.forFeature([UserEntity])],
      });
    })(),
  ],
})
export class AdminModule {}
