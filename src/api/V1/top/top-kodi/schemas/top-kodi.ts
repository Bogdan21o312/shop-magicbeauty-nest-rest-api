import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'

export type TopKodiDocument = TopKodi & Document

@Schema()
export class TopKodi {
  @Prop()
  title: string

  @Prop()
  price: number
}

export const TopKodiSchema = SchemaFactory.createForClass(TopKodi)
