import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { SocketGateway } from 'src/websocket/socket.gateway';

@Module({
  controllers: [RoomsController],
  providers: [RoomsService, SocketGateway],
})
export class RoomsModule {}
