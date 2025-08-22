// src/common/guards/operation.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { OPERATION_CODE_KEY } from "../decorators/operation-code.decorator";

@Injectable()
export class OperationGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const operationCode = this.reflector.getAllAndOverride<string>(
      OPERATION_CODE_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (!operationCode) return true; // No operation required

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) throw new ForbiddenException("No user in request");

    const hasAccess = user.operations?.includes(operationCode);

    if (!hasAccess) {
      throw new ForbiddenException(`Missing permission: ${operationCode}`);
    }

    return true;
  }
}
