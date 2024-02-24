import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class JoinRoomDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsOptional()
  password: string;
}
