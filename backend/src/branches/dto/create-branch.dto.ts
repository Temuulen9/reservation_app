import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateBranchDto {
  @IsNotEmpty({ message: "Name is required" })
  name: string;

  @IsOptional()
  profilePicture: string;
}
