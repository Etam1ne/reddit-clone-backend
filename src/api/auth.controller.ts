import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from 'src/core/services/auth.service';
import { SignInDto } from 'src/shared/dtos/sign-in.dto';
import { SignUpDto } from 'src/shared/dtos/sign-up.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }
}
