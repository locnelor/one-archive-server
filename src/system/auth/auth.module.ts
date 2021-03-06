import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";

@Module({
    imports: [
        JwtModule.register({
            secret: "sbppk"
        })
    ],
    providers: [JwtStrategy, AuthService],
    controllers: [AuthController],
    exports: [JwtStrategy]
})
export class AuthModule { }