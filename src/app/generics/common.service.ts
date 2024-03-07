import { Repository } from 'typeorm';
import * as Response from '@/app/response';

export class CommonService<T>  {
  constructor(private readonly repository: Repository<T>) {}

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findOne(id: number) {
    const found = await this.repository.findOne({where:{id} as any});

    if(!found) {
      Response.notFound(`${id} Not found`);
    }

    return found;
  }


  async create(createDto: any) {
    const entity = await this.repository.create(createDto);
    return await this.repository.save(entity);
  }

  async update(id: number, updateDto: any): Promise<T | null> {
    const entity = await this.findOne(id);

    const fusion = this.repository.merge(entity, updateDto);
    return this.repository.save(fusion);
  }


  async remove(id: number){
    await this.findOne(id);
    await this.repository.delete(id);
  }
}