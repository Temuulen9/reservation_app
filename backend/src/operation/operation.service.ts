import { BadRequestException, Injectable } from "@nestjs/common";
import { OperationCodeEnum } from "src/common/enums/operation.code.enum";

@Injectable()
export class OperationService {
  constructor() {}

  async getOperations() {}

  async syncOperations() {
    let operations: any[] = [];
    // for (const operation of Object.values(OperationCodeEnum)) {
    //   const newOperation = await this.prisma.operation.upsert({
    //     where: { code: operation },
    //     update: {},
    //     create: {
    //       name: operation,
    //       description: operation,
    //       code: operation,
    //     },
    //   });

    //   operations.push(newOperation);
    // }

    return operations;
  }

  async createOperation({
    name,
    code,
    description,
  }: {
    name: string;
    code: string;
    description: string;
  }) {
    // const operation = await this.prisma.operation.findUnique({
    //   where: { code },
    // });
    // if (operation) {
    //   throw new BadRequestException(
    //     `Operation with code "${code}" already exists`
    //   );
    // }
    // const operations = await this.prisma.operation.create({
    //   data: {
    //     name,
    //     code,
    //     description,
    //   },
    // });
    // return operations;
  }

  async editOperation({
    name,
    code,
    description,
  }: {
    name: string;
    code: string;
    description: string;
  }) {
    // const operation = await this.prisma.operation.findUnique({
    //   where: { code },
    // });
    // if (!operation) {
    //   throw new BadRequestException(`Operation with code "${code}" not found`);
    // }
    // const operations = await this.prisma.operation.update({
    //   where: {
    //     code,
    //   },
    //   data: {
    //     name,
    //     description,
    //   },
    // });
    // return operations;
  }

  async deleteOperation({ code }: { code: string }) {
    // const existing = await this.prisma.operation.findUnique({
    //   where: { code },
    // });
    // if (!existing) {
    //   throw new BadRequestException(`Operation with code "${code}" not exists`);
    // }
    // const operations = await this.prisma.operation.delete({
    //   where: {
    //     code,
    //   },
    // });
    // return operations;
  }
}
