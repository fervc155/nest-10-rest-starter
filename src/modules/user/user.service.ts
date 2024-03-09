// user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CommonService } from '@/app/generics';
import * as Responses from '@/app/response';


@Injectable()
export class UserService extends CommonService<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }


  //example of override
  async create(createDto: any) {

    if(createDto['password']) {
      createDto['password']= await User.hashPassword(createDto['password'])
    }
    const entities = await this.userRepository.create(createDto);
    return await this.userRepository.save(entities);
  }


  async update(id: number, updateDto: any) {
    const user = await this.findOne(id);

    let fusion = this.userRepository.merge(user, updateDto);
    
    if(updateDto['password']) {
      updateDto['password'] = await User.hashPassword(updateDto['password']);
    }
    
    return this.userRepository.save(fusion);
  }


}