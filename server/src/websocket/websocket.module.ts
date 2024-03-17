import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { RoomsService } from 'src/rooms/rooms.service';

@Module({
  providers: [RoomsService, AuthService],
})
export class WebsocketModule {}
