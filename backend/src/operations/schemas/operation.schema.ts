// cats/schemas/cat.schema.ts
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type OperationDocument = Operation & Document;

@Schema()
export class Operation {
  @Prop({ required: true })
  name: string;

  @Prop()
  code: string;

  @Prop()
  desc: string;
}

export const OperationSchema = SchemaFactory.createForClass(Operation);
