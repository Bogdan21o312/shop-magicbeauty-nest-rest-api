import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostDocument = SchemaPost & Document;

@Schema()
export class SchemaPost {
    @Prop({ required: true, type: String })
    title: string;

    @Prop({ required: true, type: String })
    content: string;

    @Prop({ type: String })
    author: string;

    @Prop({ default: Date.now, immutable: true })
    created_at: Date;

    @Prop({ default: Date.now })
    updated_at: Date;
}

export const PostSchema = SchemaFactory.createForClass(SchemaPost);
PostSchema.index({ '$**': 'text' });

PostSchema.pre('findOneAndUpdate', function(next) {
    this.set({ updated_at: new Date() });
    next();
});
