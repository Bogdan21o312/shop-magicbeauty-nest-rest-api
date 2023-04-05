import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PostService } from "./post.service";
import { PostController } from "./post.controller";
import { SchemaPost, PostSchema } from "./schemas/post.schema";

@Module({
  providers: [PostService],
  controllers: [PostController],
  imports: [
    MongooseModule.forFeature([
      { name: SchemaPost.name, schema: PostSchema }
    ])
  ]
})
export class PostModule {
}
