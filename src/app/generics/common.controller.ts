import {BadRequestException , Query, UsePipes , Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CommonService } from './common.service';
import { FileInterceptor } from '@nestjs/platform-express';

export class CommonController<T> {

  constructor(protected readonly service: CommonService<T>) {}

  @Get()
  async findAll(@Query('page') page = null, @Query('pageSize') pageSize = null): Promise<T[]> {

    let paginated = {} as any;

    if(page) {
      paginated.page=page
    }

    if(pageSize) {
      paginated.pageSize=pageSize
    }

    return await this.service.findAll(null, paginated);
  }


  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.service.findOne(+id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.service.remove(+id);
  }
  @Delete(':id/force')
  async forceRemove(@Param('id') id: string) {
    await this.service.forceRemove(+id);
  }

 
  @Post(':id/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@Param('id') id:string, @UploadedFile() file) {
    return await this.service.saveFile(+id,file);
  }

}
