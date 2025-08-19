// cats/schemas/cat.schema.ts
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { RoleDocument } from "src/role/schemas/role.schema";

export type UserDocument = User & Document;

@Schema({ versionKey: false })
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop()
  age: number;

  @Prop()
  phonenumber: number;

  @Prop()
  password: string;

  @Prop()
  roleId: number;

  @Prop({ type: Types.ObjectId, ref: "Role" })
  role: RoleDocument; // roleId ref
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.__v; // remove __v
    delete ret._id; // optionally replace _id with id
    return ret;
  },
});
