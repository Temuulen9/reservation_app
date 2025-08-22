import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type BranchDocument = Branch & Document;

@Schema({ _id: true })
export class Branch {
  @Prop({ required: true })
  name: string;

  @Prop()
  profilePicture: string;

  @Prop({ type: Types.ObjectId, ref: "Organization", required: true })
  organization: Types.ObjectId;
}

export const BranchSchema = SchemaFactory.createForClass(Branch);

BranchSchema.set("toJSON", {
  transform: (doc, ret) => {
    (ret as any)._id = ret._id.toString();
    delete (ret as any).__v;
    delete (ret as any).organization;
    return ret;
  },
});
