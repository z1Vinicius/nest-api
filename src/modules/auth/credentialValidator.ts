import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import UserEntity from '../users/entities/user.entity';

export const adminCredentialValidator = {
  inject: [getRepositoryToken(UserEntity)],
  useFactory: (userRepository: Repository<UserEntity>) => {
    return async function validateCredentials(
      email: string,
      password: string,
      ctx?: any, // Add the ctx parameter
    ): Promise<any> {
      const AdminJs = await import('adminjs');
      try {
        const user: UserEntity | null = await userRepository.findOneByOrFail({ email });

        const comparePassword = await bcrypt.compare(password, user.password);
        if (comparePassword) {
          return { email: user.email };
        }
      } catch (error) {
        return null;
      }
      return null;
    };
  },
};
