import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @IsEmail()
  public readonly email: string;

  @IsNotEmpty()
  @IsString()
  public readonly password: string;
}

export class SignUpDto extends SignInDto {
  @IsNotEmpty()
  @IsString()
  public readonly username: string;
}
