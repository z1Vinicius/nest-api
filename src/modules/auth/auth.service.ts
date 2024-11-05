import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import UserService from '../users/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserService) {}

  async login(email: string, password: string) {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      throw new BadRequestException('Usuário não está cadastrado');
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      throw new UnauthorizedException('A senha informada está incorreta');
    }
    return { message: 'Usuário autenticado' };
  }
}
