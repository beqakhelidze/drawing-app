import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';

@Controller('')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get('rooms')
  async getRooms(): Promise<any> {
    return this.roomsService.getRooms();
  }

  @Get('create-room')
  createRoom(): { roomId: string } {
    return this.roomsService.createRoom();
  }

  @Post('check-room')
  checkRoom(@Body() { roomId }: { roomId: string }) {
    if (roomId.length === 0) {
      throw new BadRequestException('Please provide room ID!');
    }
    return this.roomsService.checkRoomIsAvailable(roomId);
  }
}
