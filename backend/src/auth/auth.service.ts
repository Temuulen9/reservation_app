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

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async register(dto: RegisterDto) {
    try {
      const hashed = await bcrypt.hash(dto.password, 10);
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      const user = await this.userModel
        .findOne({
          email: dto.email,
        })
        .exec();

      if (user) {
        throw new ConflictException("User already registered");
      }

      const createdUser = await this.userModel.create({
        email: dto.email,
        firstname: dto.firstname,
        lastname: dto.lastname,
        age: dto.age,
        phonenumber: dto.phonenumber,
        roleId: 3,
        password: hashed,
      });

      const { password, ...result } = createdUser.toObject();

      return {
        success: true,
        data: result,
      };
    } catch (e) {
      return e;
    }
  }

  async verifyOtp(email: string, otp: string) {
    throw new UnauthorizedException("Invalid OTP");
  }

  async emailLogin(dto: LoginDto, headers: any) {
    const user = await this.userModel.findOne({ email: dto.email });

    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException("Invalid credentials");
    }
    const payload = {
      id: user._id,
      email: user.email,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      success: true,
      accessToken: token,
      user: {
        email: user.email,
      },
    };
  }
}
