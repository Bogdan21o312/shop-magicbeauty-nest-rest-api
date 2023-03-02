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
import {TopKodiService} from './top-kodi.service';
import {TopKodi} from "./schemas/top-kodi";
import {CreateTopKodiDto} from "./dto/create-top-kodi.dto";
import {UpdateTopKodiDto} from "./dto/update-top-kodi.dto";
import {TOP_KODI_URL} from "../config";

@Controller(TOP_KODI_URL)
export class TopKodiController {

    constructor(private readonly productsService: TopKodiService) {
    }

    @Get()
    getAll(): Promise<TopKodi[]> {
        return this.productsService.getAll()
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<TopKodi> {
        return this.productsService.getById(id)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Header('Cache-Control', 'none')
    create(@Body() createProductDto: CreateTopKodiDto): Promise<TopKodi> {
        return this.productsService.create(createProductDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<TopKodi> {
        return this.productsService.remove(id)
    }

    @Put(':id')
    update(@Body() updateProductDto: UpdateTopKodiDto, @Param('id') id: string): Promise<TopKodi> {
        return this.productsService.update(id, updateProductDto)
    }

}
