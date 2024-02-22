import { User } from './user.interface';

export interface Room {
  id: string;
  maxUsers: number;
  users: User[];
  secured: boolean;
  password?: string;
}
