import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "src/core/services/auth.service";
import { LocalStrategy } from "./local/local.strategy";

@Module({
    imports: [PassportModule],
    providers: [AuthService, LocalStrategy]
})
export class AuthModule {}