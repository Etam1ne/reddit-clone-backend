import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @IsEmail()
  public readonly email: string;

  @IsNotEmpty()
  public readonly password: string;
}

export class SignUpDto extends SignInDto {
  @IsString()
  public readonly username: string;
}
