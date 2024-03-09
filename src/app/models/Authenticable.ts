import ModelMedia from './ModelMedia';
import * as bcrypt from 'bcrypt'
import Jwt from '../jwt';
import * as shortid from 'shortid'
import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

export default class Authenticable extends ModelMedia{


    @Column({type:'boolean', default:false})
    emailVerified:boolean;

    @Column({nullable:true})
    private token:string;

    @Column({type:'timestamp', nullable:true})
    private tokenExpiredAt:Date

    @Column({nullable:true, unique:true})
    email:string;

    @Column({nullable:true})
    private password:string;

    public setPassword(password) {
        this.password=password;
    }


    public static async hashPassword(password) {
      const hash = await bcrypt.genSalt();
      return await bcrypt.hash(password, hash);
    }

    public async matchPassword(password) {
        return await bcrypt.compare(password, this.password)
    }

    public async login(extra:any={}) {

       
        let sub = {
            id:this.id,
            email:this.email,
            ...extra
           
        }

        const jwt = new Jwt()
        return jwt.sign({
            sub
        });
    }

    public setToken(token:string) {
        this.token = token
    }

    public setTokenExpiredAt(date:any) {
        this.tokenExpiredAt = date;
    }


    public generateToken(hours:number=1) {
        this.token = shortid.generate();

        const expired = new Date();
        expired.setHours(expired.getHours() + hours);
        this.tokenExpiredAt =  expired;

        return this.token;
    }

    public checkToken(token: string) {

        let now = new Date();
        let expired = new Date(new Date(this.tokenExpiredAt));

        return token==this.token && expired.getTime()>now.getTime();
    }


    toJSON() {
        let data = this as any;

        delete data.password;
        delete data.token;
        delete data.tokenExpiredAt;
        return data;
    }

  }