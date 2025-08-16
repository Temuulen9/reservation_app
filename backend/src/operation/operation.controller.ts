import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  HttpCode,
} from "@nestjs/common";
import { OperationService } from "./operation.service";
import { JwtAuthGuard } from "src/auth/jwt/jwt-auth.guard";
import { OperationGuard } from "src/common/guards/operation.guard";
import { OperationCode } from "src/common/decorators/operation-code.decorator";
import { OperationCodeEnum } from "src/common/enums/operation.code.enum";

@Controller("operation")
export class OperationController {
  constructor(private operationService: OperationService) {}

  @UseGuards(JwtAuthGuard, OperationGuard)
  @OperationCode(OperationCodeEnum.GET_OPERATIONS)
  @Get("")
  getOperations() {
    return this.operationService.getOperations();
  }

  @UseGuards(JwtAuthGuard, OperationGuard)
  @OperationCode(OperationCodeEnum.GET_OPERATIONS)
  @Get("sync")
  syncOperations() {
    return this.operationService.syncOperations();
  }

  @UseGuards(JwtAuthGuard, OperationGuard)
  @OperationCode(OperationCodeEnum.CREATE_OPERATION)
  @Post("create")
  createOperation(
    @Body() body: { name: string; code: string; description: string }
  ) {
    return this.operationService.createOperation({
      code: body.code,
      name: body.name,
      description: body.description,
    });
  }

  @UseGuards(JwtAuthGuard, OperationGuard)
  @OperationCode(OperationCodeEnum.EDIT_OPERATION)
  @Post("edit")
  editOperation(
    @Body() body: { name: string; code: string; description: string }
  ) {
    return this.operationService.editOperation({
      code: body.code,
      name: body.name,
      description: body.description,
    });
  }

  @UseGuards(JwtAuthGuard, OperationGuard)
  @OperationCode(OperationCodeEnum.DELETE_OPERATION)
  @Post("delete")
  @HttpCode(200)
  deleteOperation(@Body() body: { code: string }) {
    return this.operationService.deleteOperation({
      code: body.code,
    });
  }
}
