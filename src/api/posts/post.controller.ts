import { Controller, Delete, Get, Param, Put, Query, Body, Post } from "@nestjs/common";
import { PostService } from './post.service';
import { SchemaPost } from './schemas/post.schema';
import { PostDto } from "./dto/post.dto";

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async findAll(
    @Query('_limit') limit: number,
    @Query('_page') page: number,
    @Query('_search') search: string,
  ): Promise<{ data: SchemaPost[]; total: number; limit: number; page: number }> {
    const [data, total] = await this.postService.findAll(limit, page, search);
    return {
      data,
      total,
      limit,
      page,
    };
  }

  @Post()
  async create(@Body() postDto: PostDto): Promise<SchemaPost> {
    return await this.postService.create(postDto);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<SchemaPost> {
    return await this.postService.findById(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<SchemaPost> {
    return await this.postService.delete(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() postDto: PostDto): Promise<SchemaPost> {
    return await this.postService.update(id, postDto);
  }
}
