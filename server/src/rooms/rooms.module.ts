import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { SocketGateway } from 'src/websocket/socket.gateway';
import { AuthService } from 'src/auth/auth.service';

@Module({
  controllers: [RoomsController],
  providers: [RoomsService, SocketGateway, AuthService],
})
export class RoomsModule {}
