import { Repository } from 'typeorm';
import * as Response from '@/app/response';

export class CommonService<T>  {
  constructor(private readonly repository: Repository<T>) {}

  async findAll(relations=[]) {
    let result = await this.repository.find({where:{deletedAt:null}, relations});
    return clearResults(result,relations);
  }


  async where(wheres:any={},relations=[]) {
    let result = await this.repository.find({where:{deletedAt:null, ...wheres}, relations});
    return clearResults(result,relations);
  }

  async findOne(id: number, relations=[]) {
    const found = await this.repository.findOne({where:{id, deletedAt:null} as any}, relations);

    if(!found) {
      Response.notFound(`${id} Not found`);
    }

    return clearResult(found, relations);
  }
  
  private clearResult(model:any, relations) {
    for(let relation in relations) {
      model[relation] = model[relation].filter(re=>re.deletedAt==null)
    }
    return model;
  }


  private clearResults(models:any, relations) {
    return models.map((model)=>clearResult(model, relations));
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



  remove(id: number): Promise<UpdateResult> {
    return this.update(id, { deletedAt: new Date() });
  }

  async forceRemove(id: number){
    await this.findOne(id);
    await this.repository.delete(id);
  }
}