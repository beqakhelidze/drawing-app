import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const bearerToken = request.headers.authorization;
    try {
      if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
        throw new UnauthorizedException('Invalid token format');
      }
      const token = bearerToken.split(' ')[1];
      const roomId = await this.authService.verifyToken(token);
      request.body.roomId = roomId;
      return true;
    } catch (error) {
      return false;
    }
  }
}
