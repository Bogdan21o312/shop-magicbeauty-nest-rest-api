import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as moment from 'moment-timezone';

export type UserDocument = SchemaUser & Document;

@Schema()
export class SchemaUser {
  @Prop({ required: true, type: String })
  email: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ type: Boolean, default: false })
  banned?: boolean;

  @Prop({ type: Boolean, default: false })
  admin?: boolean;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  surname: string;

  @Prop({ type: String })
  tel?: string;

  @Prop({ type: String })
  phone_number?: string;

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

export const UserSchema = SchemaFactory.createForClass(SchemaUser);
UserSchema.index({ '$**': 'text' });

UserSchema.pre('findOneAndUpdate', function (next) {
  this.set({ 'history.$[].timestamp': new Date() });
  next();
});

