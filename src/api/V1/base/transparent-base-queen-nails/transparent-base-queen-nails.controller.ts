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
import {TransparentBaseQueenNailsService} from './transparent-base-queen-nails.service';
import {TransparentBaseQueenNails} from "./schemas/transparent-base-queen-nails";
import {CreateTransparentBaseQueenNailsDto} from "./dto/create-transparent-base-queen-nails.dto";
import {UpdateTransparentBaseQueenNailsDto} from "./dto/update-transparent-base-queen-nails.dto";
import {BASE_TRANSPARENT_QUEEN_NAILS_URL} from "../config";

@Controller(BASE_TRANSPARENT_QUEEN_NAILS_URL)
export class TransparentBaseQueenNailsController {

    constructor(private readonly productsService: TransparentBaseQueenNailsService) {
    }

    @Get()
    getAll(): Promise<TransparentBaseQueenNails[]> {
        return this.productsService.getAll()
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<TransparentBaseQueenNails> {
        return this.productsService.getById(id)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Header('Cache-Control', 'none')
    create(@Body() createProductDto: CreateTransparentBaseQueenNailsDto): Promise<TransparentBaseQueenNails> {
        return this.productsService.create(createProductDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<TransparentBaseQueenNails> {
        return this.productsService.remove(id)
    }

    @Put(':id')
    update(@Body() updateProductDto: UpdateTransparentBaseQueenNailsDto, @Param('id') id: string): Promise<TransparentBaseQueenNails> {
        return this.productsService.update(id, updateProductDto)
    }

}
