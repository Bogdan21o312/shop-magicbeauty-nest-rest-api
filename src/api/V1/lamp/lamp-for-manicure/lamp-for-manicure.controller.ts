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
import {LampForManicureService} from './lamp-for-manicure.service';
import {LampForManicure} from "./schemas/lamp-for-manicure";
import {CreateLampForManicureDto} from "./dto/create-lamp-for-manicure.dto";
import {UpdateLampForManicureDto} from "./dto/update-lamp-for-manicure.dto";
import {LAMP_FOR_MANICURE_URL} from "../config";

@Controller(LAMP_FOR_MANICURE_URL)
export class LampForManicureController {

    constructor(private readonly productsService: LampForManicureService) {
    }

    @Get()
    getAll(): Promise<LampForManicure[]> {
        return this.productsService.getAll()
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<LampForManicure> {
        return this.productsService.getById(id)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Header('Cache-Control', 'none')
    create(@Body() createProductDto: CreateLampForManicureDto): Promise<LampForManicure> {
        return this.productsService.create(createProductDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<LampForManicure> {
        return this.productsService.remove(id)
    }

    @Put(':id')
    update(@Body() updateProductDto: UpdateLampForManicureDto, @Param('id') id: string): Promise<LampForManicure> {
        return this.productsService.update(id, updateProductDto)
    }

}
