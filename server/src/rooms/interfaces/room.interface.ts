import { LineDto } from 'src/websocket/socket.dto';
import { User } from './user.interface';

export interface Room {
  id: string;
  name: string;
  maxUsers: number;
  users: User[];
  secured: boolean;
  password?: string;
  lines: LineDto[];
}
