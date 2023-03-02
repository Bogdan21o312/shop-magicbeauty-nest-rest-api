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
import {GelPolishesQueenNailsService} from './gel-polishes-queen-nails.service';
import {GelPolishesQueenNails} from "./schemas/gel-polishes-queen-nails";
import {CreateGelPolishesQueenNailsDto} from "./dto/create-gel-polishes-queen-nails.dto";
import {UpdateGelPolishesQueenNailsDto} from "./dto/update-gel-polishes-queen-nails.dto";
import {GEL_POLISHES_QUEEN_NAILS_URL} from "../config";

@Controller(GEL_POLISHES_QUEEN_NAILS_URL)
export class GelPolishesQueenNailsController {

    constructor(private readonly productsService: GelPolishesQueenNailsService) {
    }

    @Get()
    getAll(): Promise<GelPolishesQueenNails[]> {
        return this.productsService.getAll()
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<GelPolishesQueenNails> {
        return this.productsService.getById(id)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Header('Cache-Control', 'none')
    create(@Body() createProductDto: CreateGelPolishesQueenNailsDto): Promise<GelPolishesQueenNails> {
        return this.productsService.create(createProductDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<GelPolishesQueenNails> {
        return this.productsService.remove(id)
    }

    @Put(':id')
    update(@Body() updateProductDto: UpdateGelPolishesQueenNailsDto, @Param('id') id: string): Promise<GelPolishesQueenNails> {
        return this.productsService.update(id, updateProductDto)
    }

}
