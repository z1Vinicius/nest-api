import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import UserEntity from './entities/user.entity';

export const adminCredentialValidator = {
  inject: [getRepositoryToken(UserEntity)],
  useFactory: (userRepository: Repository<UserEntity>) => {
    return async function validateCredentials(email: string, password: string) {
      const user: UserEntity | null = await userRepository.findOneBy({ email });
      if (user && password === user.password) {
        return user;
      }
      return null;
    };
  },
};
