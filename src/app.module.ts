import { Module } from '@nestjs/common';

import { ProductsModule } from './modules/products/products.module';
import UserModule from './modules/users/user.module';

@Module({
  imports: [UserModule, ProductsModule],
  providers: [],
})
export class AppModule {}
