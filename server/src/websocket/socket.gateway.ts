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

  handleConnection(client: Socket) {
    const roomId = client.handshake.query.roomId as string;
    const token = client.handshake.query.token as string;

    try {
      this.roomService.authorizeRoomConnection(roomId, token, client.id);

      client.emit('authorized');
    } catch (error) {
      console.log(error.message);
      client.emit('unauthorized');
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    const clientId = client.id;
    try {
      this.roomService.removeClientFromRoom(clientId);
    } catch (error) {
      console.log(error.message);
    }
  }

  sendDrawLineInRoomExceptSender(
    socket: Socket,
    roomId: string,
    line: LineDto,
  ) {
    const id = socket.id;
    this.roomService.addnewLineInRoom(roomId, line);
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
