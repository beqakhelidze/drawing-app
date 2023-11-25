import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { LineDto } from './socket.dto';
import { instrument } from '@socket.io/admin-ui';
import { RoomsService } from 'src/rooms/rooms.service';

@WebSocketGateway({ cors: true })
export class SocketGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;
  constructor(private readonly roomService: RoomsService) {}
  afterInit() {
    instrument(this.server, {
      auth: false,
    });
  }

  getRooms() {
    return this.server.sockets.adapter.rooms;
  }

  handleConnection(client: Socket) {
    const roomId = client.handshake.query.roomId as string;
    const clientId = client.id;
    if (this.roomService.checkRoom(roomId)) {
      this.roomService.joinRoom(roomId, clientId);
      client.join(roomId);
    } else {
      client.disconnect();
    }
  }

  sendDrawLineInRoomExceptSender(
    socket: Socket,
    roomId: string,
    line: LineDto,
  ) {
    const id = socket.id;
    socket.broadcast.to(roomId).emit('draw.line', { id, line });
  }

  @SubscribeMessage('draw.line')
  handleMessage(
    @MessageBody() Body: { roomId: string; line: LineDto },
    @ConnectedSocket() socket: Socket,
  ) {
    this.sendDrawLineInRoomExceptSender(socket, Body.roomId, Body.line);
  }

  @SubscribeMessage('clear')
  handleClear(
    @MessageBody() { roomId }: { roomId: string },
    @ConnectedSocket() socket: Socket,
  ) {
    socket.broadcast.to(roomId).emit('clear');
  }
}
