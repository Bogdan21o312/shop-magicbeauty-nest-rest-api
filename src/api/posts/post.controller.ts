import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import {PostsService} from "./post.service";

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Post()
    async create(@Body() createPostDto: CreatePostDto) {
        return this.postsService.create(createPostDto);
    }

    @Get()
    async findAll(
        @Query('page') page = 1,
        @Query('limit') limit = 10,
        @Query('search') search: string,
        @Query('sort') sort: string,
    ) {
        return this.postsService.findAll(page, limit, search, sort);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.postsService.findOne(id);
    }
}
