import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebsocketModule } from './websocket/websocket.module';
import { RoomsModule } from './rooms/rooms.module';

@Module({
  imports: [WebsocketModule, RoomsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
