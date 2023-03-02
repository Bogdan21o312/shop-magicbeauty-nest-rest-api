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
import {PrimerQueenNailsService} from './primer-queen-nails.service';
import {PrimerQueenNails} from "./schemas/primer-queen-nails";
import {CreatePrimerQueenNailsDto} from "./dto/create-primer-queen-nails.dto";
import {UpdatePrimerQueenNailsDto} from "./dto/update-primer-queen-nails.dto";
import {PRIMER_QUEEN_NAILS_URL} from "../config";

@Controller(PRIMER_QUEEN_NAILS_URL)
export class PrimerQueenNailsController {

    constructor(private readonly productsService: PrimerQueenNailsService) {
    }

    @Get()
    getAll(): Promise<PrimerQueenNails[]> {
        return this.productsService.getAll()
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<PrimerQueenNails> {
        return this.productsService.getById(id)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Header('Cache-Control', 'none')
    create(@Body() createProductDto: CreatePrimerQueenNailsDto): Promise<PrimerQueenNails> {
        return this.productsService.create(createProductDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<PrimerQueenNails> {
        return this.productsService.remove(id)
    }

    @Put(':id')
    update(@Body() updateProductDto: UpdatePrimerQueenNailsDto, @Param('id') id: string): Promise<PrimerQueenNails> {
        return this.productsService.update(id, updateProductDto)
    }

}
