// cats/schemas/cat.schema.ts
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type RoleDocument = Role & Document;

@Schema()
export class Operation {
  @Prop({ required: true })
  code: string;

  @Prop()
  description?: string;
}

export const OperationSchema = SchemaFactory.createForClass(Operation);

@Schema()
export class Role {
  @Prop({ required: true })
  roleId: number;

  @Prop({ required: true })
  name: string;

  @Prop()
  desc: number;

  @Prop({ type: [OperationSchema], default: [] })
  operations: Operation[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
