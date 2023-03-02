import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'

export type TransparentBaseKodiDocument = TransparentBaseKodi & Document

@Schema()
export class TransparentBaseKodi {
  @Prop()
  title: string

  @Prop()
  price: number
}

export const TransparentBaseKodiSchema = SchemaFactory.createForClass(TransparentBaseKodi)
