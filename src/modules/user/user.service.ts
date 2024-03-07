// user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CommonService } from '@/app/generics';


@Injectable()
export class UserService extends CommonService<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }



  // //Example of override
  // async create(createDto: any) {
  //   return await this.findAll();
  // }


}