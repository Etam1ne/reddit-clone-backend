import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from 'src/common/dtos/sign-in.dto';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { User } from 'src/models/user/entities/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('signin')
    public signIn(@Body() user: User) {
        return this.authService.login(user);
    }
}
