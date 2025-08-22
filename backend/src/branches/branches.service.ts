import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateBranchDto } from "./dto/create-branch.dto";
import { UpdateBranchDto } from "./dto/update-branch.dto";
import { Branch, BranchDocument } from "./schemas/branch.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import {
  Organization,
  OrganizationDocument,
} from "src/organizations/schemas/organization.schema";

@Injectable()
export class BranchesService {
  constructor(
    @InjectModel(Branch.name) private branchModel: Model<BranchDocument>,
    @InjectModel(Organization.name)
    private orgModel: Model<OrganizationDocument>
  ) {}

  async create(createBranchDto: CreateBranchDto) {
    const org = await this.orgModel.findOne();

    if (!org) {
      throw {
        message: "Organization must exist first",
      };
    }

    const branchExist = await this.branchModel.findOne({
      name: createBranchDto.name,
    });

    if (branchExist) {
      throw new ConflictException("Branch already exists");
    }

    const branch = await this.branchModel.create({
      name: createBranchDto.name,
      profilePicture: createBranchDto.profilePicture,
      organization: org._id,
    });

    return branch.toJSON();
  }

  async findAll() {
    const branches = await this.branchModel.find().populate("organization");

    const cleanbranches = branches.map((op) => op.toJSON());

    return { branches: cleanbranches };
  }

  async findOne(id: string) {
    const branch = await this.branchModel.findById(id).populate("organization");

    if (!branch) {
      throw new NotFoundException("Branch not found");
    }

    return branch.toJSON();
  }

  async update(id: string, updateBranchDto: UpdateBranchDto) {
    const updatedBranch = await this.branchModel.updateOne(
      { _id: id },
      {
        $set: {
          name: updateBranchDto.name,
          profilePicture: updateBranchDto.profilePicture,
        },
      }
    );

    if (updatedBranch.modifiedCount > 0) {
      return;
    }

    throw new NotFoundException("Branch not found");
  }

  async remove(id: string) {
    const response = await this.branchModel.deleteOne({ _id: id });

    if (response.deletedCount == 0) {
      throw new NotFoundException("Branch not found");
    }
    return;
  }
}
