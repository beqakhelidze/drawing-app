import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { RoomsService } from 'src/rooms/rooms.service';

@Module({
  providers: [SocketGateway, RoomsService],
})
export class WebsocketModule {}
