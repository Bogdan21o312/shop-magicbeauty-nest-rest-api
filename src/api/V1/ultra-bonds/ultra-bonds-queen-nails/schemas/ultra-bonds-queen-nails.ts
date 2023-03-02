import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'

export type UltraBondsQueenNailsDocument = UltraBondsQueenNails & Document

@Schema()
export class UltraBondsQueenNails {
  @Prop()
  title: string

  @Prop()
  price: number
}

export const UltraBondsQueenNailsSchema = SchemaFactory.createForClass(UltraBondsQueenNails)
