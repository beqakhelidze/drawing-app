import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebsocketModule } from './websocket/websocket.module';
import { RoomsModule } from './rooms/rooms.module';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [WebsocketModule, RoomsModule],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
