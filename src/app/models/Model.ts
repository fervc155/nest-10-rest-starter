import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

export default class EntityBase{

    @PrimaryGeneratedColumn()
    id:number;

    @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()
    updatedAt:Date;


    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deletedAt: Date;
  }