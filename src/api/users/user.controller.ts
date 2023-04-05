import { Controller, Delete, Get, Param, Put, Query, Body, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { SchemaUser } from "./schemas/user.schema";
import { UserDto } from "./dto/user.dto";


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(
    @Query('_limit') limit: number,
    @Query('_page') page: number,
    @Query('_search') search: string,
  ): Promise<{ data: SchemaUser[]; total: number; limit: number; page: number }> {
    const [data, total] = await this.userService.findAll(limit, page, search);
    return {
      data,
      total,
      limit,
      page,
    };
  }

  @Post()
  async create(@Body() userDto: UserDto): Promise<SchemaUser> {
    return await this.userService.create(userDto);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<SchemaUser> {
    return await this.userService.findById(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<SchemaUser> {
    return await this.userService.delete(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() userDto: UserDto): Promise<SchemaUser> {
    return await this.userService.update(id, userDto);
  }
}
