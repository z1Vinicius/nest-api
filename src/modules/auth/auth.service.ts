import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import UserService from '../users/user.service';
import { IAuthPayload } from './types/auth';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      throw new BadRequestException('Usuário não está cadastrado');
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      throw new UnauthorizedException('A senha informada está incorreta');
    }
    const payload: IAuthPayload = { sub: user.id, email: user.email };
    await this.userRepository.updateLastSignIn(user);
    return { accessToken: await this.jwtService.signAsync(payload) };
  }
}
