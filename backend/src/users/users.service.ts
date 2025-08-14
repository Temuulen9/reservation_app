import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Helper } from "src/common/helper";
import { User, UserDocument } from "./schemas/user.schema";
import { Model } from "mongoose";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private helper: Helper
  ) {}

  async getUsers() {
    const users = await this.userModel.find({
      select: {
        phone: true,
        email: true,
        role: true,
      },
    });
    return users;
  }

  async updateUserRole(userId: number, roleId: number) {
    const user = await this.userModel.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const role = await this.userModel.findOne({
      where: {
        id: roleId,
      },
    });

    if (!role) {
      throw new NotFoundException("Role not found");
    }

    if (user.roleId == role.id) {
      throw new ConflictException("User has already this role");
    }

    const updatedUser = await this.userModel.updateOne({
      where: {
        id: userId,
      },
      data: {
        roleId: role.id,
      },
      select: {
        id: true,
        roleId: true,
      },
    });

    return updatedUser;
  }
}
