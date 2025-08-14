// src/common/guards/operation.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  HttpException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { OPERATION_CODE_KEY } from "../decorators/operation-code.decorator";

@Injectable()
export class OperationGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const operationCode = this.reflector.get<string>(
      OPERATION_CODE_KEY,
      context.getHandler()
    );

    if (!operationCode) return true; // No operation required

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) throw new ForbiddenException("No user in request");

    // const dbUser = await this.userModel.findOne({
    //   where: { id: user.id },
    //   include: {
    //     role: true,
    //   },
    // });

    // /// superadmin can do everything
    // if (dbUser?.roleId == 1) {
    //   return true;
    // }

    // /// user-n role tuhain operation-g duudah erhtei esehiig shalgana
    // const userRole = await this.roleModel.findOne({
    //   where: {
    //     roleId: dbUser?.roleId,
    //   },
    // });

    // const allowed = userRole?.operations.findIndex((item) => {
    //   return item.code == operationCode;
    // });

    // if (allowed == undefined) {
    //   throw new ForbiddenException(
    //     `Access denied to operation: ${operationCode}`
    //   );
    // }

    return true;
  }
}
