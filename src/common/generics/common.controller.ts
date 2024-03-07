import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CommonService } from './common.service';

@Controller()
export class CommonController<T, C, U> {

  constructor(private readonly service: CommonService<T>) {}

  @Get()
  async findAll(): Promise<T[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Post()
  async create(@Body() createDto: C) {
    return this.service.create(createDto);
  }
  

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: U): Promise<T | null> {
    return this.service.update(+id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(+id);
  }
}
