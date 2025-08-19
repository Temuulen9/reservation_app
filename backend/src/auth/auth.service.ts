import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
// const bcrypt = require('bcrypt');
import * as bcrypt from "bcrypt";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "src/user/schemas/user.schema";
import { Model } from "mongoose";
import { Role, RoleDocument } from "src/role/schemas/role.schema";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>
  ) {}

  async register(dto: RegisterDto) {
    const hashed = await bcrypt.hash(dto.password, 10);

    const user = await this.userModel
      .findOne({
        email: dto.email,
      })
      .exec();

    if (user) {
      throw new ConflictException("User already registered");
    }

    const roleUser = await this.roleModel.findOne({ name: "user" });

    const createdUser = await this.userModel.create({
      email: dto.email,
      firstname: dto.firstname,
      lastname: dto.lastname,
      age: dto.age,
      phonenumber: dto.phonenumber,
      roleId: roleUser?.roleId,
      role: roleUser?._id,
      password: hashed,
    });

    return;
  }

  async verifyOtp(email: string, otp: string) {
    throw new UnauthorizedException("Invalid OTP");
  }

  async emailLogin(dto: LoginDto, headers: any) {
    const user = await this.userModel
      .findOne({ email: dto.email })
      .populate({ path: "role", populate: { path: "operations" } })
      .exec();

    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const payload = {
      id: user._id,
      email: user.email,
      role: user.role.name,
      operations: user.role.operations.map((op) => op?.code),
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      accessToken: token,
      email: user.email,
    };
  }
}
