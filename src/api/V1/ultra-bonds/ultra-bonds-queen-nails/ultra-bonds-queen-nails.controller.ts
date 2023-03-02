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
import {UltraBondsQueenNailsService} from './ultra-bonds-queen-nails.service';
import {UltraBondsQueenNails} from "./schemas/ultra-bonds-queen-nails";
import {CreateUltraBondsQueenNailsDto} from "./dto/create-ultra-bonds-queen-nails.dto";
import {UpdateUltraBondsQueenNailsDto} from "./dto/update-ultra-bonds-queen-nails.dto";
import {ULTRA_BONDS_QUEEN_NAILS_URL} from "../config";

@Controller(ULTRA_BONDS_QUEEN_NAILS_URL)
export class UltraBondsQueenNailsController {

    constructor(private readonly productsService: UltraBondsQueenNailsService) {
    }

    @Get()
    getAll(): Promise<UltraBondsQueenNails[]> {
        return this.productsService.getAll()
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<UltraBondsQueenNails> {
        return this.productsService.getById(id)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Header('Cache-Control', 'none')
    create(@Body() createProductDto: CreateUltraBondsQueenNailsDto): Promise<UltraBondsQueenNails> {
        return this.productsService.create(createProductDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<UltraBondsQueenNails> {
        return this.productsService.remove(id)
    }

    @Put(':id')
    update(@Body() updateProductDto: UpdateUltraBondsQueenNailsDto, @Param('id') id: string): Promise<UltraBondsQueenNails> {
        return this.productsService.update(id, updateProductDto)
    }

}
