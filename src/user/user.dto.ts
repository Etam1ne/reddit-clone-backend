import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  @IsString()
  public username: string;

  @IsEmail()
  public email: string;

  @IsNotEmpty()
  public password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
