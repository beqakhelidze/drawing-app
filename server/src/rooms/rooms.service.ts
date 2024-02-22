import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Room } from './interfaces/room.interface';
import { CreateRoomDto } from './dto/create-room.dto';

@Injectable()
export class RoomsService {
  //this can be asked
  private rooms: Room[] = [];

  getRooms() {
    return this.rooms;
  }

  createRoom(createRoomDto: CreateRoomDto) {
    const id = uuidv4();
    const newRoom = {
      id,
      maxUsers: createRoomDto.maxUsers,
      users: [],
      secured: createRoomDto.secured,
      password: createRoomDto.password,
    };
    this.rooms.push(newRoom);
    return { id };
  }

  // joinRoom(roomId: string, clientId: string) {
  //   this.rooms.get(roomId).add(clientId);
  // }

  // async checkRoomIsAvailable(roomId: string) {
  //   if (this.rooms.has(roomId)) {
  //     const room = this.rooms.get(roomId);
  //     if (room.size >= 5) {
  //       throw new ForbiddenException('Maximum number of users in room!');
  //     } else {
  //       return 'Room created succesfully!';
  //     }
  //   } else {
  //     throw new NotFoundException("Can't find Room with this ID");
  //   }
  // }

  // removeClientFromRoom(clientId: string) {
  //   for (const [roomId, users] of this.rooms.entries()) {
  //     if (users.has(clientId)) {
  //       users.delete(clientId);
  //       if (users.size === 0) {
  //         this.rooms.delete(roomId);
  //       }
  //       break;
  //     }
  //   }
  // }
}
