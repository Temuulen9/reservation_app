import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt/jwt-auth.guard";
import { OperationCode } from "src/common/decorators/operation-code.decorator";
import { OperationCodeEnum } from "src/common/enums/operation.code.enum";
import { OperationGuard } from "src/common/guards/operation.guard";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard, OperationGuard)
  @OperationCode(OperationCodeEnum.GET_USERS)
  @Get("")
  getUsers() {
    return this.userService.getUsers();
  }

  @UseGuards(JwtAuthGuard, OperationGuard)
  @OperationCode(OperationCodeEnum.UPDATE_USER_ROLE)
  @Post("update-role")
  async updateUserRole(@Body() body: { userId: number; roleId: number }) {
    return this.userService.updateUserRole(body.userId, body.roleId);
  }
}
