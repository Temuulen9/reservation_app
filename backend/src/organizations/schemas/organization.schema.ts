import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Branch, BranchSchema } from "src/branches/schemas/branch.schema";

export type OrganizationDocument = Organization & Document;

@Schema({ timestamps: true })
export class Organization {
  @Prop({ required: true })
  name: string;

  @Prop()
  profilePicture: string;

  @Prop({ type: [BranchSchema], default: [] })
  branches: Branch[];
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);

OrganizationSchema.set("toJSON", {
  transform: (doc, ret) => {
    (ret as any)._id = ret._id.toString(); // convert ObjectId to string
    delete (ret as any)._id;
    delete (ret as any).__v;
    if ((ret as any).createdAt)
      (ret as any).createdAt = (ret as any).createdAt.toISOString();
    if ((ret as any).updatedAt)
      (ret as any).updatedAt = (ret as any).updatedAt.toISOString();
    return ret;
  },
});
