import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SchemaPost, PostDocument } from './schemas/post.schema';
import { PostDto } from "./dto/post.dto";

interface PostUpdate {
    title?: string;
    content?: string;
    author?: string;
    updated_at?: Date;
}

@Injectable()
export class PostService {
    constructor(@InjectModel(SchemaPost.name) private postModel: Model<PostDocument>) {}

    async findAll(limit: number, page: number, search: string): Promise<[SchemaPost[], number]> {
        const query = this.postModel.find();
        if (search) {
            const regex = new RegExp(`^${search}`, 'i');
            query.or([
                { title: { $regex: regex } },
                { content: { $regex: regex } },
                { author: { $regex: regex } }
            ]);
        }
        const total = await this.postModel.countDocuments(query);
        const data = await query
          .skip((page - 1) * limit)
          .limit(limit)
          .exec();
        return [data, total];
    }

    async findById(id: string): Promise<SchemaPost> {
        return await this.postModel.findById(id).exec();
    }

    async delete(id: string): Promise<SchemaPost> {
        return await this.postModel.findByIdAndDelete(id).exec();
    }

    async update(id: string, postDto: PostDto): Promise<SchemaPost> {
        const postToUpdate: any = {};
        if (postDto.title) {
            postToUpdate.title = postDto.title;
        }
        if (postDto.content) {
            postToUpdate.content = postDto.content;
        }
        if (postDto.hasOwnProperty('author')) {
            postToUpdate.author = postDto.author;
        }
        if (postDto.hasOwnProperty('updated_at')) {
            postToUpdate.updated_at = postDto.updated_at;
        }
        return await this.postModel.findByIdAndUpdate(id, postToUpdate, { new: true }).exec();
    }

    async create(postDto: PostDto): Promise<SchemaPost> {
        const post = new this.postModel(postDto);
        return await post.save();
    }

}
