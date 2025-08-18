import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateOperationDto } from "./dto/create-operation.dto";
import { Role, RoleDocument } from "./schemas/role.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import {
  Operation,
  OperationDocument,
} from "src/operation/schemas/operation.schema";
import { AddOperationsDto } from "./dto/add-operations.dto";

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
    @InjectModel(Operation.name)
    private operationModel: Model<OperationDocument>
  ) {}

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

  async createRole({
    name,
    roleId,
    desc,
  }: {
    name: string;
    roleId: number;
    desc: string;
  }) {
    const role = await this.roleModel.findOne({
      name: name,
    });

    if (role) {
      throw new ConflictException("Role already registered");
    }

    const createdRole = await this.roleModel.create({
      roleId,
      name,
      desc,
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
  async addOperationsToRole(dto: AddOperationsDto) {
    const { roleId, operationCodes } = dto;

    // 1️⃣ Find the role and populate current operations
    const role = await this.roleModel.findById(roleId).populate("operations");
    if (!role) {
      return {
        success: false,
        message: "Role not found",
        addedOperations: [],
      };
    }

    // 2️⃣ Find operations by code
    const operations = await this.operationModel.find({
      code: { $in: operationCodes },
    });

    if (!operations.length) {
      return {
        success: false,
        message: "No operations found",
        addedOperations: [],
      };
    }

    // 3️⃣ Filter out operations already in role
    const currentOpCodes = role.operations.map((op) => op.code);
    const missingOperations = operations.filter(
      (op) => !currentOpCodes.includes(op.code)
    );

    // 4️⃣ If no new operations, return basic response
    if (missingOperations.length === 0) {
      return {
        success: true,
        message: "No new operations to add",
        addedOperations: [],
      };
    }

    // 5️⃣ Add missing operations to role
    const missingOpIds = missingOperations.map(
      (op) => op._id as Types.ObjectId
    );
    role.operations = [
      ...(role.operations as OperationDocument[]).map(
        (op) => op._id as Types.ObjectId
      ),
      ...missingOpIds,
    ];

    await role.save();

    // 6️⃣ Return basic response with only new operation codes
    return {
      success: true,
      message: "Successfully added missing operations",
      addedOperations: missingOperations.map((op) => op.code),
    };
  }

  async editOperationOfRole(dto: CreateOperationDto) {
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
