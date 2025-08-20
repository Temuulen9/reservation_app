import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type BranchDocument = Branch & Document;

@Schema({ _id: true }) // _id will be generated for each branch
export class Branch {
  @Prop({ required: true })
  name: string;

  @Prop()
  profilePicture: string;
}

export const BranchSchema = SchemaFactory.createForClass(Branch);
