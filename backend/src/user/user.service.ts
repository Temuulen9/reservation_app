import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Helper } from "src/common/helper";
import { User, UserDocument } from "./schemas/user.schema";
import { Model } from "mongoose";
import { Role, RoleDocument } from "src/role/schemas/role.schema";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
    private helper: Helper
  ) {}

  async getUsers() {
    const users = await this.userModel
      .find()
      .populate({ path: "role", select: "-operations -_id -__v" })
      .select("-password -__v")
      .lean();

    return users.map((user) => ({
      ...user,
      id: user._id.toString(),
      _id: undefined,
    }));
  }

  async updateUserRole(userId: number, roleId: number) {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const role = await this.roleModel.findOne({
      roleId,
    });

    if (!role) {
      throw new NotFoundException("Role not found");
    }

    if (user.roleId == role.roleId) {
      throw new ConflictException("User has already this role");
    }

    const updatedUser = await this.userModel.updateOne(
      { _id: userId },
      {
        $set: {
          roleId: role.roleId,
          role: role.id,
        },
      }
    );

    return;
  }
}
