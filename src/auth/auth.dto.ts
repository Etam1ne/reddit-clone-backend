import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  public password: string;
}

export class SignUpDto extends SignInDto {
  @IsString()
  public username: string;
}
