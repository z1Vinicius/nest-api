import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import UserEntity from './entities/user.entity';

interface CurrentAdmin {
  /**
   * Admin has one required field which is an email
   */
  email: string;
  /**
   * Optional title/role of an admin - this will be presented below the email
   */
  title?: string;
  /**
   * Optional url for an avatar photo
   */
  avatarUrl?: string;
  /**
   * Id of your admin user
   */
  id?: string;
  /**
   * Optional ID of theme to use
   */
  theme?: string;
  /**
   * Extra metadata specific to given Auth Provider
   */
  _auth?: Record<string, any>;
  /**
   * Also you can put as many other fields to it as you like.
   */
  [key: string]: any;
}

export const authenticate = {
  inject: [getRepositoryToken(UserEntity)], // Inject the repository token here
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
