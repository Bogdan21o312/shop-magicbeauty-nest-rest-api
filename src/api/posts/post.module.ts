import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {PostService} from "./post.service";
import {PostController} from "./post.controller";
import {Post, PostSchema} from "./schemas/post.schema";

@Module({
    providers: [PostService],
    controllers: [PostController],
    imports: [
        MongooseModule.forFeature([
            {name: Post.name, schema: PostSchema}
        ])
    ]
})
export class PostModule {
}
