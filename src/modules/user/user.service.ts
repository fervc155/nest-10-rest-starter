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

    const entity = await this.repository.create(createDto);

    if(createDto['password']) {
      entity.hashPassword(createDto['password'])
    }

    return await this.repository.save(entity);
  }


  async update(id: number, updateDto: any): Promise<T | null> {
    const user = await this.findOne(id);

    fusion = this.repository.merge(entity, updateDto);
    
    if(updateDto['password']) {
      fusion.hashPassword(updateDto['password']);
    }
    
    return this.repository.save(fusion);
  }


}