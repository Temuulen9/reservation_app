import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type OrganizationDocument = Organization & Document;

@Schema({ timestamps: true })
export class Organization {
  @Prop({ required: true })
  name: string;

  @Prop()
  profilePicture: string;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);

OrganizationSchema.set("toJSON", {
  transform: (doc, ret) => {
    (ret as any)._id = ret._id.toString();
    delete (ret as any).__v;
    if ((ret as any).createdAt)
      (ret as any).createdAt = (ret as any).createdAt.toISOString();
    if ((ret as any).updatedAt)
      (ret as any).updatedAt = (ret as any).updatedAt.toISOString();
    return ret;
  },
});
