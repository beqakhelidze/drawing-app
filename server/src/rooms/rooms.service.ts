import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RoomsService {
  private rooms: Map<string, Set<string>> = new Map();

  getRooms() {
    const roomsObject: Record<string, string[]> = {};
    this.rooms.forEach((users, roomId) => {
      roomsObject[roomId] = Array.from(users);
    });
    return roomsObject;
  }

  createRoom(): { roomId: string } {
    const roomId = uuidv4();
    this.rooms.set(roomId, new Set());
    return { roomId };
  }

  joinRoom(roomId: string, clientId: string) {
    this.rooms.get(roomId).add(clientId);
  }

  async checkRoomIsAvailable(roomId: string) {
    if (this.rooms.has(roomId)) {
      const room = this.rooms.get(roomId);
      if (room.size >= 5) {
        throw new ForbiddenException('Maximum number of users in room!');
      } else {
        return 'Room created succesfully!';
      }
    } else {
      throw new NotFoundException("Can't find Room with this ID");
    }
  }

  removeClientFromRoom(clientId: string) {
    for (const [roomId, users] of this.rooms.entries()) {
      if (users.has(clientId)) {
        users.delete(clientId);
        if (users.size === 0) {
          this.rooms.delete(roomId);
        }
        break;
      }
    }
  }
}
