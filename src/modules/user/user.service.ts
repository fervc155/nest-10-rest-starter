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


  //example of override
  async create(createDto: any) {

    const entities = await this.userRepository.create(createDto);
    let entity = entities[0]

    if(createDto['password']) {
      entity.hashPassword(createDto['password'])
    }

    return await this.userRepository.save([entity]);
  }


  async update(id: number, updateDto: any) {
    const user = await this.findOne(id);

    let fusion = this.userRepository.merge(user, updateDto);
    
    if(updateDto['password']) {
      fusion.hashPassword(updateDto['password']);
    }
    
    return this.userRepository.save(fusion);
  }


}