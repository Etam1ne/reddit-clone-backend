import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  public username: string;

  @IsEmail()
  public email: string;

  @IsNotEmpty()
  public password: string;
}
