import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Room } from './interfaces/room.interface';
import { CreateRoomDto } from './dto/create-room.dto';
import { JoinRoomDto } from './dto/join-room.dto';
import * as jwt from 'jsonwebtoken';

const secretKey = 'pizdec';

@Injectable()
export class RoomsService {
  //this can be asked
  private rooms: Room[] = [];

  getRooms() {
    return this.rooms;
  }

  getRoomById(id: string): Room {
    const room = this.rooms.find((room) => room.id === id);
    if (!room) {
      throw new NotFoundException(`Room with ID ${id} not found`);
    }
    return room;
  }

  createRoom(createRoomDto: CreateRoomDto) {
    const id = uuidv4();
    const newRoom = {
      id,
      maxUsers: createRoomDto.maxUsers,
      users: [],
      secured: createRoomDto.secured,
      password: createRoomDto.secured ? createRoomDto.password : undefined,
    };
    this.rooms.push(newRoom);
    const token = this.generateRoomToken(id);
    return { id, token };
  }

  joinRoomRequest(joinRoomDto: JoinRoomDto) {
    const room = this.getRoomById(joinRoomDto.id);
    if (room.secured) {
      if (!joinRoomDto.password) {
        throw new BadRequestException('Password is required');
      }
      if (joinRoomDto.password !== room.password) {
        throw new BadRequestException('Password is wrong');
      }
    }
    const token = this.generateRoomToken(room.id);
    return { id: room.id, token };
  }

  generateRoomToken(roomId: string): string {
    const token = jwt.sign({ roomId }, secretKey);
    return token;
  }

  verifyRoomToken(token: string, secretKey: string): string | null {
    try {
      const decodedToken = jwt.verify(token, secretKey) as { roomId: string };
      return decodedToken.roomId;
    } catch (error) {
      return null;
    }
  }
}
