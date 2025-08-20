import { IsNotEmpty } from "class-validator";

export class AddOperationsDto {
  @IsNotEmpty({ message: "Role Id is required" })
  roleId: string;

  @IsNotEmpty({ message: "operation code is required" })
  operationCodes: string[];
}
