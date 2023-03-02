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
import {PrimerKodiService} from './primer-kodi.service';
import {PrimerKodi} from "./schemas/primer-kodi";
import {CreatePrimerKodiDto} from "./dto/create-primer-kodi.dto";
import {UpdatePrimerKodiDto} from "./dto/update-primer-kodi.dto";
import {PRIMER_KODI_URL} from "../config";

@Controller(PRIMER_KODI_URL)
export class PrimerKodiController {

    constructor(private readonly productsService: PrimerKodiService) {
    }

    @Get()
    getAll(): Promise<PrimerKodi[]> {
        return this.productsService.getAll()
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<PrimerKodi> {
        return this.productsService.getById(id)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Header('Cache-Control', 'none')
    create(@Body() createProductDto: CreatePrimerKodiDto): Promise<PrimerKodi> {
        return this.productsService.create(createProductDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<PrimerKodi> {
        return this.productsService.remove(id)
    }

    @Put(':id')
    update(@Body() updateProductDto: UpdatePrimerKodiDto, @Param('id') id: string): Promise<PrimerKodi> {
        return this.productsService.update(id, updateProductDto)
    }

}
