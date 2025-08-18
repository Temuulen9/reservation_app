import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { MongooseLoggerService } from "./mongoose-logger.service";
import { AuthController } from "./auth/auth.controller";
import { AuthService } from "./auth/auth.service";
import { AuthModule } from "./auth/auth.module";
import { RoleModule } from "./role/role.module";
import { UsersModule } from "./user/user.module";
import { OperationModule } from "./operation/operation.module";
import { SharedModule } from "./shared/shared.module";
import { UserService } from "./user/user.service";

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
    RoleModule,
    OperationModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, MongooseLoggerService, UserService],
})
export class AppModule {}
