// cats/schemas/cat.schema.ts
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type OperationDocument = Operation & Document;

@Schema()
export class Operation {
  @Prop({ required: true, unique: true })
  code: string;

  @Prop()
  description: string;
}

export const OperationSchema = SchemaFactory.createForClass(Operation);

OperationSchema.set("toJSON", {
  transform: (doc, ret) => {
    return ret;
  },
});
