import { Injectable } from '@nestjs/common';
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

  checkRoom(roomId: string) {
    return this.rooms.has(roomId);
  }
}
