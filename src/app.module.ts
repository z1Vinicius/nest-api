import { Module } from '@nestjs/common';

import ProductsModule from '@modules/products/products.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OracleConfigService } from './infra/db/settings/oracle.config.service';
import UserModule from './modules/users/user.module';

@Module({
  imports: [
    UserModule,
    ProductsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: OracleConfigService, inject: [OracleConfigService] }),
  ],
  providers: [],
})
export class AppModule {}
