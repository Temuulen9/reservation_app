import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  HttpCode,
} from "@nestjs/common";
import { RoleService } from "./role.service";
import { CreateOperationDto } from "./dto/create-operation.dto";
import { JwtAuthGuard } from "src/auth/jwt/jwt-auth.guard";
import { OperationGuard } from "src/common/guards/operation.guard";
import { OperationCode } from "src/common/decorators/operation-code.decorator";
import { OperationCodeEnum } from "src/common/enums/operation.code.enum";
import { AddOperationsDto } from "./dto/add-operations.dto";

@Controller("role")
export class RoleController {
  constructor(private roleService: RoleService) {}

  @UseGuards(JwtAuthGuard, OperationGuard)
  @OperationCode(OperationCodeEnum.GET_ROLES)
  @Get("")
  getRoles() {
    return this.roleService.getRoles();
  }

  @UseGuards(JwtAuthGuard, OperationGuard)
  // @OperationCode(OperationCodeEnum.CREATE_ROLE)
  @Post("create")
  createRole(@Body() body: { name: string; roleId: number; desc: string }) {
    return this.roleService.createRole({
      name: body.name,
      roleId: body.roleId,
      desc: body.desc,
    });
  }

  @UseGuards(JwtAuthGuard, OperationGuard)
  @OperationCode(OperationCodeEnum.DELETE_ROLE)
  @Post("delete")
  createRodeleteRolele(@Body() body: { name: string }) {
    return this.roleService.deleteRole({
      name: body.name,
    });
  }

  @UseGuards(JwtAuthGuard, OperationGuard)
  @OperationCode(OperationCodeEnum.GET_ROLE_OPERATIONS)
  @Get("operations")
  getOperationsOfRole(@Body() body: { roleId: number }) {
    return this.roleService.getOperationsOfRole({ roleId: body.roleId });
  }

  @UseGuards(JwtAuthGuard, OperationGuard)
  // @OperationCode(OperationCodeEnum.ADD_OPERATION_TO_ROLE)
  @HttpCode(200)
  @Post("add-operations")
  addOperationToRole(@Body() dto: AddOperationsDto) {
    return this.roleService.addOperationsToRole(dto);
  }

  @UseGuards(JwtAuthGuard, OperationGuard)
  @OperationCode(OperationCodeEnum.DELETE_OPERATION_FROM_ROLE)
  @HttpCode(200)
  @Post("remove-operation")
  removeOperationFromRole(@Body() dto: CreateOperationDto) {
    return this.roleService.removeOperationFromRole(dto);
  }
}
