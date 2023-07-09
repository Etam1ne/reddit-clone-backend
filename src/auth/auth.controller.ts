import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { SignInDto } from 'src/common/dtos/sign-in.dto';
import { SignUpDto } from 'src/common/dtos/sign-up.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  public signIn(@Body() signInDto: SignInDto) {
    return this.authService.login(signInDto);
  }

  @Post('signup')
  public signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }
}
