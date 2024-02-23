import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
  isString,
} from 'class-validator';

export class CreateRoomDto {
  @IsString()
  name: string;

  @IsNumber()
  maxUsers: number;

  @IsBoolean()
  secured: boolean;

  @ValidateIf((o) => o.secured)
  @IsString()
  password: string;
}
