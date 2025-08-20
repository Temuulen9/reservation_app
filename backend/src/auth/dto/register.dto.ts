import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsNumber,
  Min,
  Max,
  Length,
  Matches,
  IsOptional,
} from "class-validator";

export class RegisterDto {
  @IsEmail({}, { message: "Email must be valid" })
  email: string;

  @IsString({ message: "Firstname must be a string" })
  @IsNotEmpty({ message: "Firstname is required" })
  firstname: string;

  @IsString({ message: "Lastname must be a string" })
  @IsNotEmpty({ message: "Lastname is required" })
  lastname: string;

  @IsOptional()
  @IsNumber({}, { message: "Age must be a number" })
  @Min(0, { message: "Age must be at least 0" })
  @Max(120, { message: "Age must be at most 120" })
  age?: number;

  @IsOptional()
  @Matches(/^\+?\d{7,15}$/, { message: "Phonenumber must be valid" })
  phonenumber?: string;

  @IsString({ message: "Password must be a string" })
  @Length(6, 32, { message: "Password must be between 6 and 32 characters" })
  password: string;
}
