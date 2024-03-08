import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import Model from './Model';

export default class ModelMedia extends Model{


    @Column({nullable:true})
    media_url:string;

  }