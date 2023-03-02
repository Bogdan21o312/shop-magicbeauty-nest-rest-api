import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'

export type PrimerQueenNailsDocument = PrimerQueenNails & Document

@Schema()
export class PrimerQueenNails {
  @Prop()
  title: string

  @Prop()
  price: number
}

export const PrimerQueenNailsSchema = SchemaFactory.createForClass(PrimerQueenNails)
