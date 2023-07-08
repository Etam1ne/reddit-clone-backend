import {
  Injectable,
  UnauthorizedException,
  HttpStatus,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from 'src/models/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from 'src/common/dtos/sign-in.dto';
import { SignUpDto } from 'src/common/dtos/sign-up.dto';
import { User } from 'src/models/user/entities/user.entity';

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

    await this.userService.create(signUpDto);
    return await this.login(signUpDto)
  }

  public async login(signInDto: SignInDto) {
    const user = await this.userService.getByEmail(signInDto.email);

    const payload = {
      sub: user.id,
      email: user.email,
    };
    
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  public async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.getByEmail(email);

    if (!user) throw new NotFoundException('There is no user with such email');

    const isPassword = await compare(pass, user.password);
    
    if (isPassword) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
