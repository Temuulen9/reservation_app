import { Module } from "@nestjs/common";
import { OperationController } from "./operation.controller";
import { OperationService } from "./operation.service";
import { Operation, OperationSchema } from "./schemas/operation.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { OperationGuard } from "src/common/guards/operation.guard";
import { RoleModule } from "src/role/role.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Operation.name, schema: OperationSchema },
    ]),
    RoleModule,
  ],
  controllers: [OperationController],
  providers: [OperationService],
  exports: [OperationService, MongooseModule],
})
export class OperationModule {}
