import {
  ExecutionContext,
  Injectable,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { decode } from 'jsonwebtoken';

@Injectable()
export class UserAccessGuard extends AuthGuard('jwt') {
  constructor(@Inject() private readonly jwtService: JwtService) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const token = this.extractJwtToken(request);
    if (!token) throw new UnauthorizedException();

    const userId = this.extractUserIdFromJwtToken(token);
    const resourseId = request.params.userId;

    return userId === resourseId;
  }

  private extractJwtToken(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : null;
  }

  private extractUserIdFromJwtToken(token: string) {
    try {
      const decoded = decode(token);
      return decoded.sub;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
