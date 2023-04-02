import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'

export type GelPolishesKodiDocument = GelPolishesKodi & Document

@Schema()
export class GelPolishesKodi {

  @Prop()
  title: string

  @Prop()
  capacity: string

  @Prop()
  name: string

  @Prop()
  price: number
}

export const GelPolishesKodiSchema = SchemaFactory.createForClass(GelPolishesKodi)
