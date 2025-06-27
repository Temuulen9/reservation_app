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
import { User, UserDocument } from "src/user/schemas/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class OperationGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const operationCode = this.reflector.get<string>(
      OPERATION_CODE_KEY,
      context.getHandler()
    );

    if (!operationCode) return true; // No operation required

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) throw new ForbiddenException("No user in request");

    const dbUser = await this.userModel.findOne({
      where: { id: user.id },
      include: {
        role: {
          include: {
            RoleOperationLimit: true,
          },
        },
      },
    });

    /// superadmin can do everything
    // if (dbUser?.roleId == 1) {
    //   return true;
    // }

    // /// user-n role tuhain operation-g duudah erhtei esehiig shalgana
    // const allowed = dbUser?.role?.RoleOperationLimit.some(
    //   (op) => op.operationCode === operationCode
    // );

    // if (!allowed) {
    //   return true;
    //   // throw new ForbiddenException(
    //   //   `Access denied to operation: ${operationCode}`,
    //   // );
    // }

    return true;
  }
}
