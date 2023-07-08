import { Module } from '@nestjs/common';
import { UserModule } from 'src/models/user/user.module';
import { UserService } from 'src/models/user/user.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/user/entities/user.entity';
import { Community } from 'src/models/community/entities/community.entity';
import { LocalStrategy } from './strategies/local.strategy';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [
        ConfigModule.forRoot({envFilePath: '.env'}),
        UserModule, 
        PassportModule, 
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '24h'}
        }),
        TypeOrmModule.forFeature([User, Community])
    ],
    providers: [UserService, AuthService, LocalStrategy, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}
