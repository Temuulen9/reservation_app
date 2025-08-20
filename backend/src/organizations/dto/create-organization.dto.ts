import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateOrganizationDto {
  @IsNotEmpty({ message: "Email must be valid" })
  name: string;

  @IsOptional()
  profilePicture: string;
}
