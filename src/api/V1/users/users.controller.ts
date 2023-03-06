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
import {UsersService} from './users.service';
import {CreateUsersDto} from "./dto/create-users.dto";
import {UpdateUsersDto} from "./dto/update-users.dto";
import {USERS_URL} from "./config";
import {Users} from "./schemas/users";

@Controller(USERS_URL)
export class UsersController {

    constructor(private readonly productsService: UsersService) {
    }

    @Get()
    getAll(): Promise<Users[]> {
        return this.productsService.getAll()
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<Users> {
        return this.productsService.getById(id)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Header('Cache-Control', 'none')
    create(@Body() createProductDto: CreateUsersDto): Promise<Users> {
        return this.productsService.create(createProductDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<Users> {
        return this.productsService.remove(id)
    }

    @Put(':id')
    update(@Body() updateProductDto: UpdateUsersDto, @Param('id') id: string): Promise<Users> {
        return this.productsService.update(id, updateProductDto)
    }

}
