/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, EntityRepository, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Repository, UpdateDateColumn } from "typeorm";
import Authenticable from '@/app/models/Authenticable';

@Entity({name:"users"})
export class User extends Authenticable {
    
    @Column({nullable:true})
    nombre:String;

}



