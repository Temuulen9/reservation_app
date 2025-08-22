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
import { BranchesService } from "./branches.service";
import { CreateBranchDto } from "./dto/create-branch.dto";
import { UpdateBranchDto } from "./dto/update-branch.dto";
import { JwtAuthGuard } from "src/auth/jwt/jwt-auth.guard";
import { OperationGuard } from "src/common/guards/operation.guard";

@Controller("branches")
export class BranchesController {
  constructor(private readonly branchesService: BranchesService) {}

  @UseGuards(JwtAuthGuard, OperationGuard)
  @Post()
  create(@Body() createBranchDto: CreateBranchDto) {
    return this.branchesService.create(createBranchDto);
  }

  @UseGuards(JwtAuthGuard, OperationGuard)
  @Get()
  findAll() {
    return this.branchesService.findAll();
  }

  @UseGuards(JwtAuthGuard, OperationGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.branchesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, OperationGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateBranchDto: UpdateBranchDto) {
    return this.branchesService.update(id, updateBranchDto);
  }

  @UseGuards(JwtAuthGuard, OperationGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.branchesService.remove(id);
  }
}
