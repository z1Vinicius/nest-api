// src/admin/admin.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { validate } from 'class-validator';
import OrderItemEntity from '../orders/entities/order-item.entity';
import OrderEntity from '../orders/entities/order.entity';
import ProductCategoryEntity from '../products/entities/product-category.entity';
import ProductDetailEntity from '../products/entities/product-details.entity';
import ProductEntity from '../products/entities/product.entity';
import UserEntity from '../users/entities/user.entity';
import UserModule from '../users/user.module';
import UserService from '../users/user.service';

console.log('teste');

@Module({
  imports: [
    UserModule,
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
        useFactory: (userRepository: UserService) => {
          return {
            adminJsOptions: {
              rootPath: '/admin',
              resources: [
                UserEntity,
                ProductEntity,
                ProductCategoryEntity,
                ProductDetailEntity,
                OrderEntity,
                OrderItemEntity,
              ],
            },
            auth: {
              authenticate: async (email, password) => {
                const user = await userRepository.getUserByEmail(email);
                if (user) {
                  const matched = await bcrypt.compare(password, user.password);
                  if (matched) {
                    return Promise.resolve({ email: email });
                  }
                }
                return null;
              },
              cookieName: 'admin',
              cookiePassword: 'enterString',
            },
          };
        },
        imports: [UserModule],
        inject: [UserService],
      });
    })(),
  ],
  providers: [UserService],
})
export class AdminModule {}
