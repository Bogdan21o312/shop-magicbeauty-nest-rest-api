import { Controller, Delete, Get, Param, Put, Query, Body, Post, UseInterceptors, UploadedFiles } from "@nestjs/common";
import { GelPolishesKodiService } from "./gel-polishes-kodi.service";
import { GelPolishesKodi } from "./schemas/gel-polishes-kodi";
import { GelPolishesKodiDto } from "./dto/gel-polishes-kodi.dto";
import { GEL_POLISHES_KODI_URL } from "../api/V1/gel-polishes/config";
import { FileFieldsInterceptor } from "@nestjs/platform-express";


@Controller(GEL_POLISHES_KODI_URL)
export class GelPolishesKodiController {
    constructor(private readonly GelPolishesKodiService: GelPolishesKodiService) {
    }

    @Get()
    async findAll(
      @Query("_limit") limit: number,
      @Query("_page") page: number,
      @Query("_search") search: string
    ): Promise<{ data: GelPolishesKodi[]; total: number; limit: number; page: number }> {
        const [data, total] = await this.GelPolishesKodiService.findAll(limit, page, search);
        return {
            data,
            total,
            limit,
            page
        };
    }

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 },
    ]))
    async create(@UploadedFiles() files,@Body() gelPolishesKodiDto: GelPolishesKodiDto): Promise<GelPolishesKodi> {
        const {picture} = files
        return await this.GelPolishesKodiService.create(gelPolishesKodiDto, picture[0]);
    }

    @Get(":id")
    async findById(@Param("id") id: string): Promise<GelPolishesKodi> {
        return await this.GelPolishesKodiService.findById(id);
    }

    @Delete(":id")
    async delete(@Param("id") id: string): Promise<GelPolishesKodi> {
        return await this.GelPolishesKodiService.delete(id);
    }

    @Put(":id")
    async update(@Param("id") id: string, @Body() gelPolishesKodiDto: GelPolishesKodiDto): Promise<GelPolishesKodi> {
        return await this.GelPolishesKodiService.update(id, gelPolishesKodiDto);
    }
}
