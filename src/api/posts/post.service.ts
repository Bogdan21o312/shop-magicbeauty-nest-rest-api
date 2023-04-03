import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './schemas/post.schema';
import { PostDto } from "./dto/post.dto";

@Injectable()
export class PostService {
    constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

    async findAll(limit: number, page: number, search: string): Promise<[Post[], number]> {
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

    async findById(id: string): Promise<Post> {
        return await this.postModel.findById(id).exec();
    }

    async delete(id: string): Promise<Post> {
        return await this.postModel.findByIdAndDelete(id).exec();
    }

    async update(id: string, postDto: PostDto): Promise<Post> {
        return await this.postModel.findByIdAndUpdate(id, postDto, { new: true }).exec();
    }

}
