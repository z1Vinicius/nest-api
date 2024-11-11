import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IUserPayload } from './types/auth';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.getHeaderToken(request);
    if (!token) {
      throw new UnauthorizedException('Token não presente na requisição');
    }
    try {
      const payload: IUserPayload = await this.jwtService.verifyAsync(token);
      request.user = payload;
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Token inválido');
    }
    return true;
  }

  private getHeaderToken(req: Request) {
    const [type, token] = typeof req.headers.authorization === 'string' ? req.headers.authorization.split(' ') : [];
    return type === 'Bearer' ? token : undefined;
  }
}
