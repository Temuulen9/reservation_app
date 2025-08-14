import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { MongooseLoggerService } from "./mongoose-logger.service";
import { AuthController } from "./auth/auth.controller";
import { AuthService } from "./auth/auth.service";
import { AuthModule } from "./auth/auth.module";
import { RolesModule } from "./roles/roles.module";
import { UsersModule } from "./users/users.module";
import { OperationsModule } from "./operations/operations.module";
import { SharedModule } from "./shared/shared.module";
import { UsersService } from "./users/users.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI ?? "", {
      dbName: "reservation_dev",
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    OperationsModule,
    SharedModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, MongooseLoggerService, UsersService],
})
export class AppModule {}
