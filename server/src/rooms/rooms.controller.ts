import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
  ValidationPipe,
  UseGuards,
  Res,
  Req,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { JoinRoomDto } from './dto/join-room.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get('rooms')
  async getRooms() {
    return this.roomsService.getRooms();
  }

  @Get('room')
  @UseGuards(AuthGuard)
  async getRooom(@Body() body) {
    return this.roomsService.getRoomById(body.roomId);
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
