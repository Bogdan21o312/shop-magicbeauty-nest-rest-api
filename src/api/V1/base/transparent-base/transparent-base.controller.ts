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
import {TransparentBaseService} from './transparent-base.service';
import {TransparentBase} from "./schemas/transparent-base";
import {CreateTransparentBaseDto} from "./dto/create-transparent-base.dto";
import {UpdateTransparentBaseDto} from "./dto/update-transparent-base.dto";
import {BASE_TRANSPARENT_URL} from "../config";

@Controller(BASE_TRANSPARENT_URL)
export class TransparentBaseController {

    constructor(private readonly productsService: TransparentBaseService) {
    }

    @Get()
    getAll(): Promise<TransparentBase[]> {
        return this.productsService.getAll()
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<TransparentBase> {
        return this.productsService.getById(id)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Header('Cache-Control', 'none')
    create(@Body() createProductDto: CreateTransparentBaseDto): Promise<TransparentBase> {
        return this.productsService.create(createProductDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<TransparentBase> {
        return this.productsService.remove(id)
    }

    @Put(':id')
    update(@Body() updateProductDto: UpdateTransparentBaseDto, @Param('id') id: string): Promise<TransparentBase> {
        return this.productsService.update(id, updateProductDto)
    }

}
