import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateOrganizationDto {
  @IsNotEmpty({ message: "Name is required" })
  name: string;

  @IsOptional()
  profilePicture: string;
}
