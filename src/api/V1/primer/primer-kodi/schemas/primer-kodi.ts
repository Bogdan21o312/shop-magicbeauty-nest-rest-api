import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'

export type PrimerKodiDocument = PrimerKodi & Document

@Schema()
export class PrimerKodi {
  @Prop()
  title: string

  @Prop()
  price: number
}

export const PrimerKodiSchema = SchemaFactory.createForClass(PrimerKodi)

