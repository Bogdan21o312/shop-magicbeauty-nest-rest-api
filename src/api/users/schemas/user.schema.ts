import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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

  @Prop({
    type: [
      {
        timestamp: { type: Date, default: Date.now },
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

