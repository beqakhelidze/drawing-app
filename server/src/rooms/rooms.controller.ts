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

@Controller('')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get('rooms')
  async getRooms(): Promise<any> {
    return this.roomsService.getRooms();
  }

  @Post('create-room')
  createRoom(@Body(ValidationPipe) createRoomDto: CreateRoomDto) {
    console.log(createRoomDto);
    return this.roomsService.createRoom(createRoomDto);
  }

  // @Post('check-room')
  // checkRoom(@Body() { roomId }: { roomId: string }) {
  //   if (roomId.length === 0) {
  //     throw new BadRequestException('Please provide room ID!');
  //   }
  //   return this.roomsService.checkRoomIsAvailable(roomId);
  // }
}
