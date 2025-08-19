import { BadRequestException, Injectable } from "@nestjs/common";
import { OperationCodeEnum } from "src/common/enums/operation.code.enum";
import { Operation, OperationDocument } from "./schemas/operation.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class OperationService {
  constructor(
    @InjectModel(Operation.name)
    private operationModel: Model<OperationDocument>
  ) {}

  async getOperations() {
    const operations = await this.operationModel.find();

    const cleanOperations = operations.map((op) => op.toJSON());

    return cleanOperations;
  }

  async syncOperations() {
    const operations: {
      code: OperationCodeEnum;
      created: boolean;
      updated: boolean;
    }[] = [];

    for (const code of Object.values(OperationCodeEnum)) {
      const result = await this.operationModel.updateOne(
        { code }, // filter
        {
          $setOnInsert: {
            name: code,
            description: code,
            code: code,
          },
        },
        { upsert: true } // create if not exists
      );

      if (result.upsertedCount > 0 || result.modifiedCount > 0) {
        operations.push({
          code,
          created: result.upsertedCount > 0,
          updated: result.modifiedCount > 0,
        });
      }
    }

    return {
      message: "Operations synced successfully",
      operations: operations,
    };
  }

  async createOperation({
    code,
    description,
  }: {
    code: string;
    description: string;
  }) {
    const operation = await this.operationModel.findOne({ code });

    if (operation) {
      throw new BadRequestException(
        `Operation with code "${code}" already exists`
      );
    }

    const operations = await this.operationModel.create({
      code,
      description,
    });
    return operations.toJSON();
  }

  async editOperation({
    code,
    description,
  }: {
    code: string;
    description: string;
  }) {
    const operation = await this.operationModel.findOne({
      code,
    });

    if (!operation) {
      throw new BadRequestException(`Operation with code "${code}" not found`);
    }

    await this.operationModel.updateOne(
      {
        code,
      },
      {
        $set: {
          description,
        },
      }
    );
    return;
  }

  async deleteOperation({ code }: { code: string }) {
    const existing = await this.operationModel.findOne({
      code,
    });

    if (!existing) {
      throw new BadRequestException(`Operation with code "${code}" not exists`);
    }

    const result = await this.operationModel.deleteOne({
      code,
    });

    if (result.deletedCount === 0) {
      throw new BadRequestException(
        `Failed to delete operation with code "${code}"`
      );
    }

    return { message: `Operation with code "${code}" deleted successfully` };
  }
}
