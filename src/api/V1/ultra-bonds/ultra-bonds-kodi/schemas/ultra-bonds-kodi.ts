import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'

export type UltraBondsKodiDocument = UltraBondsKodi & Document

@Schema()
export class UltraBondsKodi {
  @Prop()
  title: string

  @Prop()
  price: number
}

export const UltraBondsKodiSchema = SchemaFactory.createForClass(UltraBondsKodi)
