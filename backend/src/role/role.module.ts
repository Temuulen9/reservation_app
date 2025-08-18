import { Module } from "@nestjs/common";
import { RoleService } from "./role.service";
import { RoleController } from "./role.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Role, RoleSchema } from "./schemas/role.schema";
import { OperationGuard } from "src/common/guards/operation.guard";
import {
  Operation,
  OperationSchema,
} from "src/operation/schemas/operation.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
    MongooseModule.forFeature([
      { name: Operation.name, schema: OperationSchema },
    ]),
  ],
  providers: [RoleService],
  controllers: [RoleController],
  exports: [RoleService, MongooseModule],
})
export class RoleModule {}
