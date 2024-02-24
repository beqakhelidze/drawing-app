import {
  IsBoolean,
  IsNumber,
  IsString,
  ValidateIf,
  IsNotEmpty,
  Min,
  Max,
} from 'class-validator';

export class CreateRoomDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumber()
  @Min(2, { message: 'Users minimum should be 2' })
  @Max(15, { message: 'Users maximum should be 15' })
  maxUsers: number;

  @IsBoolean({ message: 'secured value should be boolean' })
  secured: boolean;

  @ValidateIf((o) => o.secured)
  @IsNotEmpty()
  @IsString()
  password: string;
}
