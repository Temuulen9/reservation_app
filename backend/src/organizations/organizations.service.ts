import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateOrganizationDto } from "./dto/create-organization.dto";
import { UpdateOrganizationDto } from "./dto/update-organization.dto";
import { InjectModel } from "@nestjs/mongoose";
import {
  Organization,
  OrganizationDocument,
} from "./schemas/organization.schema";
import { Model } from "mongoose";

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectModel(Organization.name)
    private orgModel: Model<OrganizationDocument>
  ) {}

  async create(createOrganizationDto: CreateOrganizationDto) {
    const isOrgExisting = await this.orgModel.findOne({
      name: createOrganizationDto.name,
    });

    if (isOrgExisting) {
      throw new ConflictException("Organization already registered");
    }

    const org = await this.orgModel.create({
      name: createOrganizationDto.name,
      profilePicture: createOrganizationDto.profilePicture,
    });

    return org.toJSON();
  }

  async findOne(id: string) {
    const org = await this.orgModel.findById(id);

    if (!org) {
      throw new NotFoundException("Organization not found");
    }

    return org.toJSON();
  }

  async update(id: string, updateOrganizationDto: UpdateOrganizationDto) {
    const org = await this.orgModel.findById(id);

    if (!org) {
      throw new NotFoundException("Organization not found");
    }

    await this.orgModel.updateOne(
      { _id: id },
      {
        $set: {
          name: updateOrganizationDto.name,
          profilePicture: updateOrganizationDto.profilePicture,
        },
      }
    );

    return;
  }

  async remove(id: string) {
    const org = await this.orgModel.findById(id);

    if (!org) {
      throw new NotFoundException("Organization not found");
    }

    await this.orgModel.deleteOne({ _id: id });

    return;
  }
}
