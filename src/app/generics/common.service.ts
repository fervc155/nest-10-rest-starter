import { Repository } from 'typeorm';
import * as Responses from '@/app/response';
import {  UploadedFile } from '@nestjs/common';
import * as fs from 'fs';
import * as shortid from 'shortid';
import ModelMedia from '@/app/models/ModelMedia';

export class CommonService<T>  {
  constructor(private readonly repository: Repository<T>) {}

  async findAll(relations=[], paginated={}) {
    let result = await this.repository.find({
      where:{deletedAt:null} as any,
      ...paginated,
      relations});
    return this.clearResults(result,relations);
  }


  async where(wheres:any={},relations=[]) {
    let result = await this.repository.find({where:{deletedAt:null, ...wheres} as any, relations});
    return this.clearResults(result,relations);
  }

  async findOne(id: number, relations=[]) {
    const found = await this.repository.findOne({where:{id, deletedAt:null} as any, relations});

    if(!found) {
      Responses.notFound(`${id} Not found`);
    }

    return this.clearResult(found, relations);
  }
  
  private clearResult(model:any, relations) {
    for(let relation in relations) {
      model[relation] = model[relation].filter(re=>re.deletedAt==null)
    }
    return model;
  }


  private clearResults(models:any, relations) {
    return models.map((model)=>this.clearResult(model, relations));
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



  remove(id: number) {
    return this.update(id, { deletedAt: new Date() });
  }

  async forceRemove(id: number){
    await this.findOne(id);
    await this.repository.delete(id);
  }


 
  async saveFile(id: number, file: Express.Multer.File) {

    const model = await this.findOne(id);

    if (!(model instanceof ModelMedia)) { 
       Responses.badRequest("Este entity no hereda de ModelMedia")
    }


    const dir = __dirname.replaceAll('\\dist\\app\\generics', '\\uploads\\');
    if(model.media_url) {
      try{
        fs.unlinkSync(dir+model.media_url);
      } catch(error){
      }
    }

    const fileUrl = await this.storeFile(file);

    model.media_url = fileUrl;

    await this.update(id, model as any);

    return "Imagen guardada correctamente"

    
  }

  async storeFile(file: Express.Multer.File) {
    let extensions = file.originalname.split(".")
    let extension = extensions[extensions.length-1]

    const fileName = `${shortid.generate()}.${extension}`;
    const path = __dirname+`/../../../uploads/${fileName}`;


    return new Promise((resolve, reject) =>
      fs.createWriteStream(path)
        .end(file.buffer)
        .on('finish', () => resolve(fileName))
        .on('error', reject),
    );
  }
 


}