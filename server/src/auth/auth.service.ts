import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

const secretKey = 'pizdec';

@Injectable()
export class AuthService {
  generateToken(roomId: string): string {
    const token = jwt.sign({ roomId }, secretKey);
    return token;
  }

  async verifyToken(token: string): Promise<string | UnauthorizedException> {
    const decodedToken = jwt.verify(token, secretKey) as jwt.JwtPayload;
    if (decodedToken && decodedToken.roomId) {
      return decodedToken.roomId;
    } else {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
