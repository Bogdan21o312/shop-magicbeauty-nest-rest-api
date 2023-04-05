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

  @Prop({ default: Date.now, immutable: true })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(SchemaUser);
UserSchema.index({ '$**': 'text' });

UserSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updated_at: new Date() });
  next();
});
