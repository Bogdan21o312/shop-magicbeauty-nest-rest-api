import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './post.schema';
import {CreatePostDto} from "./dto/create-post.dto";

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post.name) private postModel: Model<PostDocument>,
    ) {}

    async findAll(
        search: string,
        page: number = 1,
        limit: number = 10,
        sortBy: string = 'createdAt',
        sortOrder: string = 'desc',
    ) {
        const skip = (page - 1) * limit;
        const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

        const query = search
            ? {
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { content: { $regex: search, $options: 'i' } },
                ],
            }
            : {};

        const count = await this.postModel.countDocuments(query);
        const posts = await this.postModel
            .find(query)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .exec();

        return { count, page, limit, posts };
    }

    async create(createPostDto: CreatePostDto): Promise<Post> {
        const createdPost = new this.postModel(createPostDto);
        return createdPost.save();
    }

    async findOne(id: string): Promise<Post> {
        return this.postModel.findById(id).exec();
    }

    async update(id: string, updatePostDto: any): Promise<Post> {
        return this.postModel.findByIdAndUpdate(id, updatePostDto, { new: true });
    }

    async remove(id: string): Promise<Post> {
        return this.postModel.findByIdAndRemove(id);
    }
}
