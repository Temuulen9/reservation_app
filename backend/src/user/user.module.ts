import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/user.schema";
import { SharedModule } from "src/shared/shared.module";
import { OperationGuard } from "src/common/guards/operation.guard";
import { RoleModule } from "src/role/role.module";
import { Role, RoleSchema } from "src/role/schemas/role.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
    SharedModule,
    RoleModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [MongooseModule],
})
export class UsersModule {}
