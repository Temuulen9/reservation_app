// cats/schemas/cat.schema.ts
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema({ versionKey: false })
export class User {
  @Prop({ required: true })
  email: string;

  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop()
  age: number;

  @Prop()
  phonenumber: number;

  @Prop()
  password: string;

  @Prop()
  roleId: number;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.__v; // remove __v
    ret.id = ret._id; // optionally replace _id with id
    delete ret._id;
    return ret;
  },
});
