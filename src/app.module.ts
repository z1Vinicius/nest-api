import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OracleConfigService } from './infra/db/settings/oracle.config.service';
import { OrdersModule } from './modules/orders/orders.module';
import ProductsModule from './modules/products/products.module';
import UserModule from './modules/users/user.module';
import { PostgresConfigService } from './infra/db/settings/postgres.config.service';
import { APP_FILTER } from '@nestjs/core';
import HttpExceptionHandler from './filters/error-handler';

@Module({
  imports: [
    UserModule,
    ProductsModule,
    OrdersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: PostgresConfigService, inject: [PostgresConfigService] }),
  ],
  providers: [{
    provide: APP_FILTER,
    useClass: HttpExceptionHandler
  }],
})
export class AppModule {}
