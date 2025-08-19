// cats/schemas/cat.schema.ts
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { OperationDocument } from "src/operation/schemas/operation.schema";

export type RoleDocument = Role & Document;

@Schema()
export class Role {
  @Prop({ required: true })
  roleId: number;

  @Prop({ required: true })
  name: string;

  @Prop()
  desc: string;

  @Prop({ type: [Types.ObjectId], ref: "Operation", default: [] })
  operations: Types.ObjectId[] | OperationDocument[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);

RoleSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = ret._id.toString(); // add a clean id field
    delete ret._id; // optional: remove raw _id
    delete ret.__v; // remove mongoose version key
    return ret;
  },
});
