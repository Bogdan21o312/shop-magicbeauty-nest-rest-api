import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'

export type GelPolishesQueenNailsDocument = GelPolishesQueenNails & Document

@Schema()
export class GelPolishesQueenNails {
  @Prop()
  title: string

  @Prop()
  price: number
}

export const GelPolishesQueenNailsSchema = SchemaFactory.createForClass(GelPolishesQueenNails)
