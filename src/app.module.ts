import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import HttpExceptionHandler from './filters/error-handler';
import { OracleConfigService } from './infra/db/settings/oracle.config.service';
import { OrdersModule } from './modules/orders/orders.module';
import ProductsModule from './modules/products/products.module';
import UserModule from './modules/users/user.module';

@Module({
  imports: [
    UserModule,
    ProductsModule,
    OrdersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: OracleConfigService, inject: [OracleConfigService] }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionHandler,
    },
  ],
})
export class AppModule {}
