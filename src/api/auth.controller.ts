import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/core/services/auth.service';
import { SignInDto } from 'src/shared/dtos/sign-in.dto';
import { SignUpDto } from 'src/shared/dtos/sign-up.dto';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/core/use-cases/auth/local/local-auth.guard';
import { User } from 'src/infra/postgres/entities/user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  signIn(@Body() user: User) {
    return this.authService.login(user);
  }

  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }
}
