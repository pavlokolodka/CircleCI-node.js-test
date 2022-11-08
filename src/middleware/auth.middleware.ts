import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request & { email: string }, res: Response, next: NextFunction) {
    const token = this.parseToken(req.headers['authorization']);

    const user = this.jwtService.verify(token, {
      publicKey: process.env.PRIVATE_KEY,
    });

    req.email = user.email;

    next();
  }

  private parseToken(rawToken?: string) {
    if (!rawToken) {
      throw new UnauthorizedException('Missing Authorization Header');
    }

    const [bearer, token] = rawToken.split(' ');

    if (!bearer || bearer !== 'Bearer') {
      throw new UnauthorizedException('Invalid token format');
    }
    if (!token) {
      throw new UnauthorizedException('Invalid auth token');
    }

    return token;
  }
}
