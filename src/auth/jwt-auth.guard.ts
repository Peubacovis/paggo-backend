import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private jwtService: JwtService) {
    super();
  }

  handleRequest(err, user, info: Error, context: ExecutionContext): any {
    if (err || !user) {
      throw err || new UnauthorizedException('Usuário não autorizado');
    }
    return user;
  }
}
