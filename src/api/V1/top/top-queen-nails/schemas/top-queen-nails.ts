import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'

export type TopQueenNailsDocument = TopQueenNails & Document

@Schema()
export class TopQueenNails {
  @Prop()
  title: string

  @Prop()
  price: number
}

export const TopQueenNailsSchema = SchemaFactory.createForClass(TopQueenNails)
