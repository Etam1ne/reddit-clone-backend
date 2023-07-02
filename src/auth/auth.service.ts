import {
  Injectable,
  UnauthorizedException,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignInDto, SignUpDto } from './auth.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const checkEmail = await this.userService.getByEmail(signUpDto.email);
    if (checkEmail) {
      throw new HttpException(
        'User with this email is already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.userService.create(signUpDto);
  }

  async signIn(signInDto: SignInDto): Promise<any> {
    const user = await this.userService.getByEmail(signInDto.email);
    const isPassword = await compare(signInDto.password, user.password);

    if (!isPassword) {
      throw new UnauthorizedException();
    }

    return this.generateJwtToken(user);
  }

  private async generateJwtToken(user: User) {
    const payload = {
      sub: user.userId,
      username: user.username,
      email: user.email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
