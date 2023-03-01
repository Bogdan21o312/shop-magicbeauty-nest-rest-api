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
import {GelPolishesKodiService} from './gel-polishes-kodi.service';
import {GelPolishesKodi} from "./schemas/gel-polishes-kodi";
import {CreateGelPolishesKodiDto} from "./dto/create-gel-polishes-kodi.dto";
import {UpdateGelPolishesKodiDto} from "./dto/update-gel-polishes-kodi.dto";

@Controller('api/gel-polishes/gel-polishes-kodi')
export class GelPolishesKodiController {

    constructor(private readonly productsService: GelPolishesKodiService) {
    }

    @Get()
    getAll(): Promise<GelPolishesKodi[]> {
        return this.productsService.getAll()
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<GelPolishesKodi> {
        return this.productsService.getById(id)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Header('Cache-Control', 'none')
    create(@Body() createProductDto: CreateGelPolishesKodiDto): Promise<GelPolishesKodi> {
        return this.productsService.create(createProductDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<GelPolishesKodi> {
        return this.productsService.remove(id)
    }

    @Put(':id')
    update(@Body() updateProductDto: UpdateGelPolishesKodiDto, @Param('id') id: string): Promise<GelPolishesKodi> {
        return this.productsService.update(id, updateProductDto)
    }

}
