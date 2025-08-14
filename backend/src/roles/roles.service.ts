import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateOperationDto } from "./dto/create-operation.dto";
import { Role, RoleDocument } from "./schemas/role.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

  async getRoles() {
    const roles = await this.roleModel.find({
      id: true,
      name: true,
    });
    return {
      success: true,
      data: {
        roles,
      },
    };
  }

  async createRole({ name, roleId }: { name: string; roleId: number }) {
    const role = await this.roleModel.findOne({
      name: name,
    });

    if (role) {
      throw new ConflictException("Role already registered");
    }

    const createdRole = await this.roleModel.create({
      roleId,
      name,
    });

    return {
      success: true,
      data: {
        createdRole,
      },
    };
  }

  async deleteRole({ name }: { name: string }) {
    const role = await this.roleModel.findOne({
      where: {
        name: name,
      },
    });

    if (!role) {
      throw new NotFoundException(`Role not found`);
    }

    const deletedRole = await this.roleModel.deleteOne({
      where: {
        name: name,
      },
    });
    return deletedRole;
  }

  async getOperationsOfRole({ roleId }: { roleId: number }) {
    const role = await this.roleModel.findOne({
      where: {
        id: roleId,
      },
    });

    if (!role) {
      throw new NotFoundException(`Role not found`);
    }

    const operations = await this.roleModel.find({
      where: {
        id: role?.id,
      },
    });

    return operations;
  }

  async addOperationToRole(dto: CreateOperationDto) {
    const { roleId, operationCode } = dto;

    const operation = await this.roleModel.findOne({
      where: { code: operationCode },
    });

    const roleOperation = await this.roleModel.findOne({
      where: {
        id: roleId,
        RoleOperationLimit: {
          some: {
            operationCode,
          },
        },
      },
    });
    if (roleOperation) {
      throw new ConflictException(
        `"${operationCode}" operation already assigned to the role `
      );
    }
    0;
    if (!operation) {
      throw new NotFoundException(
        `Operation with code "${operationCode}" not found`
      );
    }

    const role = await this.roleModel.findOne({
      where: {
        id: roleId,
      },
    });

    if (!role) {
      throw new NotFoundException(`Role not found`);
    }

    return "Successfull";
  }

  async editOperationOfRole(dto: CreateOperationDto) {
    const { roleId, operationCode, maxCallCount } = dto;

    const operation = await this.roleModel.findOne({
      where: { code: operationCode },
    });

    if (!operation) {
      throw new NotFoundException(
        `Operation with code "${operationCode}" not found`
      );
    }

    const role = await this.roleModel.findOne({
      where: {
        id: roleId,
      },
    });

    if (!role) {
      throw new NotFoundException(`Role not found`);
    }

    // const updatedRole = await this.roleModel.update({
    //   where: {
    //     roleId_operationCode: {
    //       roleId,
    //       operationCode,
    //     },
    //   },
    //   update: {
    //     roleId,
    //     operationCode,
    //     callCount: maxCallCount,
    //   },
    //   create: {
    //     roleId,
    //     operationCode,
    //     callCount: maxCallCount,
    //   },
    // });

    // return updatedRole;
  }

  async removeOperationFromRole(dto: CreateOperationDto) {
    const { roleId, operationCode } = dto;

    const operation = await this.roleModel.findOne({
      where: { code: operationCode },
    });

    if (!operation) {
      throw new NotFoundException(
        `Operation with code "${operationCode}" not found`
      );
    }

    const role = await this.roleModel.findOne({
      where: {
        id: roleId,
      },
    });

    if (!role) {
      throw new NotFoundException(`Role not found`);
    }

    const updatedRole = await this.roleModel.deleteOne({
      where: { id: roleId },
    });

    return updatedRole;
  }
}
