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
import { LineDto } from 'src/websocket/socket.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class RoomsService {
  //this can be asked
  private rooms: Room[] = [];

  constructor(private readonly authService: AuthService) {}

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
    const existingRoom = this.rooms.find(
      (room) => room.name === createRoomDto.name,
    );
    if (existingRoom) {
      throw new BadRequestException(
        `Room with name ${createRoomDto.name} already exists`,
      );
    }

    const id = uuidv4();
    const newRoom = {
      id,
      name: createRoomDto.name,
      maxUsers: createRoomDto.maxUsers,
      users: [],
      secured: createRoomDto.secured,
      password: createRoomDto.secured ? createRoomDto.password : undefined,
      lines: [],
    };
    this.rooms.push(newRoom);
    const token = this.authService.generateToken(id);
    return { id, token, name: newRoom.name };
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
    const token = this.authService.generateToken(room.id);
    return { id: room.id, token };
  }

  addClientInRoom(room: Room, clientId: string) {
    // Check if the client is already in the room
    const clientExists = room.users.some((user) => user.id === clientId);

    if (clientExists) {
      throw new BadRequestException(
        `Client with ID ${clientId} is already in the room`,
      );
    }

    // Add the client to the room's users list
    room.users.push({
      id: clientId,
      nickname: 'default',
    });
  }

  removeClientFromRoom(clientId: string): void {
    const roomContainingUser = this.rooms.find((room) =>
      room.users.some((u) => u.id === clientId),
    );

    if (!roomContainingUser) {
      throw new NotFoundException(
        `Room with ID ${roomContainingUser.id} not found`,
      );
    }

    const index = roomContainingUser.users.findIndex(
      (user) => user.id === clientId,
    );

    if (index === -1) {
      throw new NotFoundException(
        `Client with ID ${clientId} is not in the room`,
      );
    }

    roomContainingUser.users.splice(index, 1);
  }

  authorizeRoomConnection(roomId: string, token: string, clientId: string) {
    const room = this.getRoomById(roomId);

    if (room.maxUsers === room.users.length) {
      throw new BadRequestException('Room is already full');
    }
    if (!room) {
      throw new NotFoundException(`Room with ID ${roomId} not found`);
    }

    const decodedRoomId = this.authService.verifyToken(token);
    if (!decodedRoomId) {
      throw new BadRequestException('Invalid token');
    }

    this.addClientInRoom(room, clientId);
    return {
      roomName: room.name,
      lines: room.lines,
    };
  }

  addnewLineInRoom(roomId: string, line: LineDto) {
    const room = this.getRoomById(roomId);
    room.lines.push(line);
  }
}
