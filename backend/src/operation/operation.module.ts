import { Module } from "@nestjs/common";
import { OperationController } from "./operation.controller";
import { OperationService } from "./operation.service";
import { Operation, OperationSchema } from "./schemas/operation.schema";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Operation.name, schema: OperationSchema },
    ]),
  ],
  controllers: [OperationController],
  providers: [OperationService],
})
export class OperationModule {}
