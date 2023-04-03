import { Controller, Delete, Get, Param, Put, Query, Body } from "@nestjs/common";
import { PostService } from './post.service';
import { Post } from './schemas/post.schema';
import { PostDto } from "./dto/post.dto";

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async findAll(
    @Query('_limit') limit: number,
    @Query('_page') page: number,
    @Query('_search') search: string,
  ): Promise<{ data: Post[]; total: number; limit: number; page: number }> {
    const [data, total] = await this.postService.findAll(limit, page, search);
    return {
      data,
      total,
      limit,
      page,
    };
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Post> {
    return await this.postService.findById(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Post> {
    return await this.postService.delete(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() postDto: PostDto): Promise<Post> {
    return await this.postService.update(id, postDto);
  }
}
