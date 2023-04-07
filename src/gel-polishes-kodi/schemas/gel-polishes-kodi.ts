import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as moment from 'moment-timezone';

export type GelPolishesKodiDocument = GelPolishesKodi & Document;

@Schema()
export class GelPolishesKodi {
  @Prop({ required: true, type: String })
  title: string;

  @Prop({ required: true, type: String })
  capacity: string;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true })
  picture: string;

  @Prop({ default: Date.now, immutable: true, validate: {
      validator: function(value: Date) {
        return moment(value).tz('Europe/Kiev').format('YYYY-MM-DD HH:mm:ss') === moment(value).tz('Europe/Kiev').format('YYYY-MM-DD HH:mm:ss');
      },
      message: 'Invalid date format'
    } })
  created_at: Date;

  @Prop({
    type: [
      {
        timestamp: { type: Date, default: moment.tz('Europe/Kiev').format('YYYY-MM-DD HH:mm:ss') },
        field: String,
        before: Object,
        after: Object,
      },
    ],
    default: [],
  })
  history: Array<{
    timestamp: Date;
    field: string;
    before: Record<string, unknown>;
    after: Record<string, unknown>;
  }>;
}

export const GelPolishesKodiSchema = SchemaFactory.createForClass(GelPolishesKodi);
GelPolishesKodiSchema.index({ '$**': 'text' });

GelPolishesKodiSchema.pre('findOneAndUpdate', function (next) {
  this.set({ 'history.$[].timestamp': new Date() });
  next();
});

