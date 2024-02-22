import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

export class CreateRoomDto {
  @IsNumber()
  maxUsers: number;

  @IsBoolean()
  secured: boolean;

  @ValidateIf((o) => o.secured)
  @IsString()
  password: string;
}
