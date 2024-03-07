import {BadRequestException , UsePipes , Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CommonService } from './common.service';


export class CommonController<T> {

  constructor(protected readonly service: CommonService<T>) {}

  @Get()
  async findAll(): Promise<T[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(+id);
  }
}
