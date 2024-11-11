import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async signIn(@Body() auth: AuthDTO) {
    const { email, password } = auth;

    const token = await this.authService.signIn(email, password);
    return token;
  }
}
