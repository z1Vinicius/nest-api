import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as memcachedStore from 'cache-manager-memcached-store';
import Memcache from 'memcache-pp';
import HttpExceptionHandler from './filters/error-handler';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { OrdersModule } from './modules/orders/orders.module';
import ProductsModule from './modules/products/products.module';
import UserModule from './modules/users/user.module';
import { PostgresConfigService } from './infra/db/settings/postgres.config.service';
const cacheManager = require('cache-manager');

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useClass: PostgresConfigService, inject: [PostgresConfigService] }),
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () =>
        cacheManager.caching({
          stores: memcachedStore,
          driver: Memcache,
          options: {
            hosts: ['127.0.0.1:11212'],
          },
        }),
    }),
    AdminModule, // Import AdminModule here
    UserModule,
    ProductsModule,
    OrdersModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionHandler,
    },
  ],
})
export class AppModule {}
