import { Controller, Get, Post, Body, NotFoundException } from '@nestjs/common';
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
    if (this.roomsService.checkRoom(roomId)) {
      return;
    } else {
      throw new NotFoundException("Room with ID doesn't exist!");
    }
  }
}
