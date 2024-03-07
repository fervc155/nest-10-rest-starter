import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CommonController} from '@/common/generics'
import { User } from './entities/user.entity'
import { ApiTags } from '@nestjs/swagger';

@ApiTags("users")
@Controller('users')
export class UserController extends CommonController<User, CreateUserDto, UpdateUserDto> {
  constructor(private readonly userService: UserService) {
    super(userService);
//    this.swagger="users"
  }


  //EXAMPLE OF OVERRIDE

  @Get(":id")
  async findOne(@Param('id') id: string):Promise<any> {
    return this.userService.findAll();
  }


}