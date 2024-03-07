/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, EntityRepository, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Repository, UpdateDateColumn } from "typeorm";
import Model from '@/app/model';

@Entity({name:"users"})
export class User extends Model {
    
    @Column()
    nombre:String;

}



