import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      const roles = this.reflector.get<string[]>('roles', context.getHandler());

      const authHeader = request.headers.authorization;
      const [prefix, token] = authHeader.split(' ');

      if (prefix !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'User is not auth' });
      }

      const user = this.jwtService.verify(token, {
        publicKey: process.env.PRIVATE_KEY,
      });

      return roles.includes(user.role);
    } catch (e) {
      throw new ForbiddenException({ message: 'no access rights' });
    }
  }
}
