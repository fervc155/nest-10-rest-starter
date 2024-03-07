import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CommonController} from '@/app/generics'
import { User } from './entities/user.entity'
import { ApiTags } from '@nestjs/swagger';

@ApiTags("users")
@Controller('users')
export class UserController extends CommonController<User> {
  constructor(protected readonly service: UserService) {
    super(service);
  }


  @Post()
  async create(@Body() createDto: CreateUserDto) {
    return this.service.create(createDto);
  }
  

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateUserDto) {
    return this.service.update(+id, updateDto);
  }




}
