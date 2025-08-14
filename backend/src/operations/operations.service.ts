import { BadRequestException, Injectable } from "@nestjs/common";
import { OperationCodeEnum } from "src/common/enums/operation.code.enum";
import { Operation, OperationDocument } from "./schemas/operation.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class OperationsService {
  constructor(
    @InjectModel(Operation.name)
    private operationModel: Model<OperationDocument>
  ) {}

  async getOperations() {
    const operations = await this.operationModel.find();
    return operations;
  }

  async syncOperations() {
    let operations: any[] = [];
    for (const operation of Object.values(OperationCodeEnum)) {
      const newOperation = await this.operationModel.updateOne({
        where: { code: operation },
        update: {},
        create: {
          name: operation,
          description: operation,
          code: operation,
        },
      });

      operations.push(newOperation);
    }

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
    const operation = await this.operationModel.findOne({
      where: { code },
    });

    if (operation) {
      throw new BadRequestException(
        `Operation with code "${code}" already exists`
      );
    }

    const operations = await this.operationModel.create({
      data: {
        name,
        code,
        description,
      },
    });
    return operations;
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
    const operation = await this.operationModel.findOne({
      where: { code },
    });

    if (!operation) {
      throw new BadRequestException(`Operation with code "${code}" not found`);
    }

    const operations = await this.operationModel.updateOne({
      where: {
        code,
      },
      data: {
        name,
        description,
      },
    });
    return operations;
  }

  async deleteOperation({ code }: { code: string }) {
    const existing = await this.operationModel.findOne({
      where: { code },
    });

    if (!existing) {
      throw new BadRequestException(`Operation with code "${code}" not exists`);
    }

    const operations = await this.operationModel.deleteMany({
      where: {
        code,
      },
    });
    return operations;
  }
}
