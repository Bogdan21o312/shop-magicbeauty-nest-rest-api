import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type LampForManicureDocument = LampForManicure & Document

@Schema()
export class LampForManicure {
  @Prop()
  title: string

  @Prop()
  in_stock: boolean

  @Prop()
  images: [string]

  @Prop()
  characteristics: [{
    producing_country: string
    color: string
    type_of_equipment: string
    additional_functions: string
    maximum_timer_setting_time: number
    the_power_of_the_lamp_for_drying_nails: string
  }]

  @Prop()
  price: number
}

export const LampForManicureSchema = SchemaFactory.createForClass(LampForManicure)
