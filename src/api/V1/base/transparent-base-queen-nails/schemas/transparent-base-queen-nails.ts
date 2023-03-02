import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'

export type TransparentBaseQueenNailsDocument = TransparentBaseQueenNails & Document

@Schema()
export class TransparentBaseQueenNails {
  @Prop()
  title: string

  @Prop()
  price: number
}

export const TransparentBaseQueenNailsSchema = SchemaFactory.createForClass(TransparentBaseQueenNails)
