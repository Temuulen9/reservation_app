// seed.ts
import { connect, disconnect, Types } from "mongoose";

import * as mongoose from "mongoose";
import {
  Operation,
  OperationSchema,
} from "./operation/schemas/operation.schema";
import { Role, RoleSchema } from "./role/schemas/role.schema";
import {
  OperationCodeEnum,
  RoleEnum,
} from "./common/enums/operation.code.enum";

async function seed() {
  await connect(
    "mongodb+srv://memigodev:memigodev@reservation-dev.qnotvvy.mongodb.net/reservation_dev?retryWrites=true&w=majority"
  );
  console.log("✅ Connected to MongoDB");

  // Define models
  const OperationModel = mongoose.model<Operation>(
    "Operation",
    OperationSchema
  );
  const RoleModel = mongoose.model<Role>("Role", RoleSchema);

  // Clear old data (optional)
  await OperationModel.deleteMany({});
  await RoleModel.deleteMany({});
  console.log("🗑️  Cleared old data");
  // create operations
  const operations = await OperationModel.insertMany([
    { code: OperationCodeEnum.ADD_OPERATION, description: "Add operation" },
    {
      code: OperationCodeEnum.REMOVE_OPERATION,
      description: "Remove operation",
    },

    // USER SECTION
    { code: OperationCodeEnum.GET_USERS, description: "Get all users" },
    {
      code: OperationCodeEnum.UPDATE_USERS_ROLE,
      description: "Update users role",
    },
    {
      code: OperationCodeEnum.UPDATE_USER_ROLE,
      description: "Update user role",
    },
    // ROLE SECTION
    { code: OperationCodeEnum.GET_ROLES, description: "Get all roles" },
    { code: OperationCodeEnum.CREATE_ROLE, description: "Create new role" },
    { code: OperationCodeEnum.DELETE_ROLE, description: "Delete role" },
    {
      code: OperationCodeEnum.GET_ROLE_OPERATIONS,
      description: "Get role operations",
    },
    {
      code: OperationCodeEnum.ADD_OPERATION_TO_ROLE,
      description: "Add operation to role",
    },
    {
      code: OperationCodeEnum.EDIT_OPERATION_OF_ROLE,
      description: "Edit role operation",
    },
    {
      code: OperationCodeEnum.DELETE_OPERATION_FROM_ROLE,
      description: "Delete operation from role",
    },

    // OPERATION SECTION
    {
      code: OperationCodeEnum.GET_OPERATIONS,
      description: "Get all operations",
    },
    { code: OperationCodeEnum.SYNC_OPERATIONS, description: "Sync operations" },
    {
      code: OperationCodeEnum.CREATE_OPERATION,
      description: "Create operation",
    },
    { code: OperationCodeEnum.EDIT_OPERATION, description: "Edit operation" },
    {
      code: OperationCodeEnum.DELETE_OPERATION,
      description: "Delete operation",
    },
  ]);

  // map for easier access
  const opMap = operations.reduce(
    (acc, op) => {
      acc[op.code] = op._id;
      return acc;
    },
    {} as Record<string, any>
  );

  // create roles with operations
  const roles = await RoleModel.insertMany([
    {
      name: RoleEnum.ADMIN,
      roleId: 1,
      desc: "Administrator with full permissions",
      operations: operations.map((op) => op._id), // admin gets all
    },
    {
      name: RoleEnum.USER,
      roleId: 2,
      desc: "Standard user with limited permissions",
      operations: [opMap[OperationCodeEnum.GET_USERS]],
    },
  ]);

  console.log("✅ Seeding complete");
  console.log("Roles:", roles);
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
