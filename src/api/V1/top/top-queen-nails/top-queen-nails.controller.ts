import {
    Body,
    Controller,
    Delete,
    Get,
    Header,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import {TopQueenNailsService} from './top-queen-nails.service';
import {TopQueenNails} from "./schemas/top-queen-nails";
import {CreateTopQueenNailsDto} from "./dto/create-top-queen-nails.dto";
import {UpdateTopQueenNailsDto} from "./dto/update-top-queen-nails.dto";
import {TOP_QUEEN_NAILS_URL} from "../config";

@Controller(TOP_QUEEN_NAILS_URL)
export class TopQueenNailsController {

    constructor(private readonly productsService: TopQueenNailsService) {
    }

    @Get()
    getAll(): Promise<TopQueenNails[]> {
        return this.productsService.getAll()
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<TopQueenNails> {
        return this.productsService.getById(id)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Header('Cache-Control', 'none')
    create(@Body() createProductDto: CreateTopQueenNailsDto): Promise<TopQueenNails> {
        return this.productsService.create(createProductDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<TopQueenNails> {
        return this.productsService.remove(id)
    }

    @Put(':id')
    update(@Body() updateProductDto: UpdateTopQueenNailsDto, @Param('id') id: string): Promise<TopQueenNails> {
        return this.productsService.update(id, updateProductDto)
    }

}
