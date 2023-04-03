import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostDocument = Post & Document;

@Schema()
export class Post {
    @Prop({ required: true, type: String })
    title: string;

    @Prop({ required: true, type: String })
    content: string;

    @Prop({ type: String })
    author: string;

    @Prop({ default: Date.now })
    created_at: Date;

    @Prop({ default: Date.now })
    updated_at: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
PostSchema.index({ '$**': 'text' });
