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
import {TransparentBaseKodiService} from './transparent-base-kodi.service';
import {TransparentBaseKodi} from "./schemas/transparent-base-kodi";
import {CreateTransparentBaseKodiDto} from "./dto/create-transparent-base-kodi.dto";
import {UpdateTransparentBaseKodiDto} from "./dto/update-transparent-base-kodi.dto";
import {BASE_TRANSPARENT_KODI_URL} from "../config";

@Controller(BASE_TRANSPARENT_KODI_URL)
export class TransparentBaseKodiController {

    constructor(private readonly productsService: TransparentBaseKodiService) {
    }

    @Get()
    getAll(): Promise<TransparentBaseKodi[]> {
        return this.productsService.getAll()
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<TransparentBaseKodi> {
        return this.productsService.getById(id)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Header('Cache-Control', 'none')
    create(@Body() createProductDto: CreateTransparentBaseKodiDto): Promise<TransparentBaseKodi> {
        return this.productsService.create(createProductDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<TransparentBaseKodi> {
        return this.productsService.remove(id)
    }

    @Put(':id')
    update(@Body() updateProductDto: UpdateTransparentBaseKodiDto, @Param('id') id: string): Promise<TransparentBaseKodi> {
        return this.productsService.update(id, updateProductDto)
    }

}
