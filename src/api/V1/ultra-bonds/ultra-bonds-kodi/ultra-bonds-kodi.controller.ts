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
import {UltraBondsKodiService} from './ultra-bonds-kodi.service';
import {UltraBondsKodi} from "./schemas/ultra-bonds-kodi";
import {CreateUltraBondsKodiDto} from "./dto/create-ultra-bonds-kodi.dto";
import {UpdateUltraBondsKodiDto} from "./dto/update-ultra-bonds-kodi.dto";
import {ULTRA_BONDS_KODI_URL} from "../config";

@Controller(ULTRA_BONDS_KODI_URL)
export class UltraBondsKodiController {

    constructor(private readonly productsService: UltraBondsKodiService) {
    }

    @Get()
    getAll(): Promise<UltraBondsKodi[]> {
        return this.productsService.getAll()
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<UltraBondsKodi> {
        return this.productsService.getById(id)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Header('Cache-Control', 'none')
    create(@Body() createProductDto: CreateUltraBondsKodiDto): Promise<UltraBondsKodi> {
        return this.productsService.create(createProductDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<UltraBondsKodi> {
        return this.productsService.remove(id)
    }

    @Put(':id')
    update(@Body() updateProductDto: UpdateUltraBondsKodiDto, @Param('id') id: string): Promise<UltraBondsKodi> {
        return this.productsService.update(id, updateProductDto)
    }

}
