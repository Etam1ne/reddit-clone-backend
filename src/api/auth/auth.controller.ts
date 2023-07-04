import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from 'src/core/services/auth.service';
import { SignInDto, SignUpDto } from 'src/shared/dtos/auth.dto';

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
