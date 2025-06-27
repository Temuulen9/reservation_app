import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { MongooseLoggerService } from "./mongoose-logger.service";
import { UserModule } from "./user/user.module";
import { RoleModule } from "./role/role.module";
import { OperationModule } from "./operation/operation.module";
import { RoleService } from "./role/role.service";
import { OperationService } from "./operation/operation.service";
import { RoleController } from "./role/role.controller";
import { OperationController } from "./operation/operation.controller";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI ?? "", {
      dbName: "sample_mflix",
    }),
    RoleModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, MongooseLoggerService],
})
export class AppModule {}
