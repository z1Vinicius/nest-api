import { Module } from '@nestjs/common';
import UserModule from '../users/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [
    {
      provide: AuthService,
      useClass: AuthService,
    },
  ],
  imports: [UserModule],
})
export class AuthModule {}
