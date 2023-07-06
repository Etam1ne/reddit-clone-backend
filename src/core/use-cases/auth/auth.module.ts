import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "src/core/services/auth.service";
import { LocalStrategy } from "./local/local.strategy";
import { UserService } from "src/core/services/user.service";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/infra/postgres/entities/user.entity";
import { Community } from "src/infra/postgres/entities/community.entity";

@Module({
    imports: [PassportModule, TypeOrmModule.forFeature([User, Community])],
    providers: [AuthService, LocalStrategy, UserService, JwtService]
})
export class AuthModule {}