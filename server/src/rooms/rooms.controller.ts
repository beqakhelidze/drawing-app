import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
  ValidationPipe,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { JoinRoomDto } from './dto/join-room.dto';

@Controller('')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get('rooms')
  async getRooms(): Promise<any> {
    return this.roomsService.getRooms();
  }

  @Post('create-room')
  createRoom(@Body(ValidationPipe) createRoomDto: CreateRoomDto) {
    return this.roomsService.createRoom(createRoomDto);
  }

  @Post('join-room')
  joinRoom(@Body(ValidationPipe) joinRoomDto: JoinRoomDto) {
    return this.roomsService.joinRoomRequest(joinRoomDto);
  }
}
