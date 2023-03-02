import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'

export type TransparentBaseDocument = TransparentBase & Document

@Schema()
export class TransparentBase {
  @Prop()
  title: string

  @Prop()
  price: number
}

export const TransparentBaseSchema = SchemaFactory.createForClass(TransparentBase)
