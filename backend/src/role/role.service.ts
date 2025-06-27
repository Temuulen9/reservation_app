import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateOperationDto } from "./dto/create-operation.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Role, RoleDocument } from "./schemas/role.schema";
import { Model } from "mongoose";

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

  async getRoles() {
    const roles = await this.roleModel.find().exec();
    return roles;
  }

  async createRole({ name }: { name: string }) {
    const role = await this.roleModel.findOne({ name }).exec();

    if (role) {
      throw new ConflictException("Role already registered");
    }

    const roles = await this.roleModel.create({
      name,
    });
    return roles;
  }

  async deleteRole({ name }: { name: string }) {
    const role = await this.roleModel.findOne({ name }).exec();

    if (!role) {
      throw new NotFoundException("Role not found");
    }

    // const role = await this.prisma.role.findUnique({
    //   where: {
    //     name: name,
    //   },
    // });

    // if (!role) {
    //   throw new NotFoundException(`Role not found`);
    // }

    const roles = await this.roleModel.deleteOne({ name }).exec();

    return roles;
  }

  // async getOperationsOfRole({ roleId }: { roleId: number }) {
  //   const role = await this.prisma.role.findUnique({
  //     where: {
  //       id: roleId,
  //     },
  //   });

  //   if (!role) {
  //     throw new NotFoundException(`Role not found`);
  //   }

  //   const operations = await this.prisma.role.findUnique({
  //     where: {
  //       id: role?.id,
  //     },

  //     include: {
  //       RoleOperationLimit: {
  //         include: {
  //           operation: true,
  //         },
  //       },
  //     },
  //   });

  //   return operations;
  // }

  // async addOperationToRole(dto: CreateOperationDto) {
  //   const { roleId, operationCode } = dto;

  //   const operation = await this.prisma.operation.findUnique({
  //     where: { code: operationCode },
  //   });

  //   const roleOperation = await this.prisma.role.findUnique({
  //     where: {
  //       id: roleId,
  //       RoleOperationLimit: {
  //         some: {
  //           operationCode,
  //         },
  //       },
  //     },
  //   });
  //   if (roleOperation) {
  //     throw new ConflictException(
  //       `"${operationCode}" operation already assigned to the role `
  //     );
  //   }

  //   if (!operation) {
  //     throw new NotFoundException(
  //       `Operation with code "${operationCode}" not found`
  //     );
  //   }

  //   const role = await this.prisma.role.findUnique({
  //     where: {
  //       id: roleId,
  //     },
  //   });

  //   if (!role) {
  //     throw new NotFoundException(`Role not found`);
  //   }

  //   // if (dto.maxCallCount != null) {
  //   const updatedRole = await this.prisma.roleOperationLimit.create({
  //     data: {
  //       roleId,
  //       operationCode,
  //     },
  //   });
  //   // }

  //   // const updatedRole = await this.prisma.role.update({
  //   //   where: { id: roleId },
  //   //   data: {
  //   //     operations: {
  //   //       connect: { id: operation.id },
  //   //     },
  //   //   },
  //   //   include: { operations: true },
  //   // });

  //   return updatedRole;
  // }

  // async editOperationOfRole(dto: CreateOperationDto) {
  //   const { roleId, operationCode } = dto;

  //   const operation = await this.prisma.operation.findUnique({
  //     where: { code: operationCode },
  //   });

  //   if (!operation) {
  //     throw new NotFoundException(
  //       `Operation with code "${operationCode}" not found`
  //     );
  //   }

  //   const role = await this.prisma.role.findUnique({
  //     where: {
  //       id: roleId,
  //     },
  //   });

  //   if (!role) {
  //     throw new NotFoundException(`Role not found`);
  //   }

  //   const updatedRole = await this.prisma.roleOperationLimit.upsert({
  //     where: {
  //       roleId_operationCode: {
  //         roleId,
  //         operationCode,
  //       },
  //     },
  //     update: {
  //       roleId,
  //       operationCode,
  //     },
  //     create: {
  //       roleId,
  //       operationCode,
  //     },
  //   });

  //   return updatedRole;
  // }

  // async removeOperationFromRole(dto: CreateOperationDto) {
  //   const { roleId, operationCode } = dto;

  //   const operation = await this.prisma.operation.findUnique({
  //     where: { code: operationCode },
  //   });

  //   if (!operation) {
  //     throw new NotFoundException(
  //       `Operation with code "${operationCode}" not found`
  //     );
  //   }

  //   const role = await this.prisma.role.findUnique({
  //     where: {
  //       id: roleId,
  //     },
  //   });

  //   if (!role) {
  //     throw new NotFoundException(`Role not found`);
  //   }

  //   const updatedRole = await this.prisma.roleOperationLimit.delete({
  //     where: { id: roleId },
  //   });

  //   return updatedRole;
  // }
}
