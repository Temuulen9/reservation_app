import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { OrganizationsService } from "./organizations.service";
import { CreateOrganizationDto } from "./dto/create-organization.dto";
import { UpdateOrganizationDto } from "./dto/update-organization.dto";
import { JwtAuthGuard } from "src/auth/jwt/jwt-auth.guard";
import { OperationGuard } from "src/common/guards/operation.guard";

@Controller("organizations")
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @UseGuards(JwtAuthGuard, OperationGuard)
  @Post()
  create(@Body() createOrganizationDto: CreateOrganizationDto) {
    return this.organizationsService.create(createOrganizationDto);
  }

  @UseGuards(JwtAuthGuard, OperationGuard)
  @Get()
  findOne() {
    return this.organizationsService.findOne();
  }

  @UseGuards(JwtAuthGuard, OperationGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto
  ) {
    return this.organizationsService.update(id, updateOrganizationDto);
  }

  @UseGuards(JwtAuthGuard, OperationGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.organizationsService.remove(id);
  }
}
