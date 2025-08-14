import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./jwt/jwt.strategy";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "src/users/users.module";
import { PassportModule } from "@nestjs/passport";
// import { JwtAuthModule } from './jwt/jwt.module';
import { HttpModule } from "@nestjs/axios";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/users/schemas/user.schema";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Store your JWT secret in .env file
      signOptions: { expiresIn: "1h" }, // Access token expires in 1 hour
    }),
    UsersModule, // Users module to handle users' data
    HttpModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
