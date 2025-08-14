import { Module } from "@nestjs/common";
import { RoleService } from "./role.service";
import { RoleController } from "./role.controller";
import { Role, RoleSchema } from "./schemas/role.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { OperationGuard } from "src/common/guards/operation.guard";
import { User } from "src/user/schemas/user.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: RoleSchema }]),
  ],
  providers: [RoleService],
  controllers: [RoleController],
})
export class RoleModule {}
