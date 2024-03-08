import Model From './Model';
import bcrypt from 'bcrypt'
import Jwt from '../jwt';
import * as shortid from 'shortid'

export default class Authenticable extends Model{


    @Column({type:'boolean': default:false})
    emailVerified:boolean;

    @Column({nullable:true})
    private token:string;

    @Column({type:'date', nullable:true})
    private tokenExpiredAt:Date

    @Column()
    email:string;

    @Column()
    private password:string;


    public setPassword(password):string {
        this.password=password;
    }


    public async hashPassword(password) {
      const hash = await bcrypt.genSalt();
      this.password =await bcrypt.hash(password, hash);
    }

    public async matchPassword(password) {
        return await bcrypt.compare(password, this.password)
    }

    public async login() {
        let payload = {
            id:this.id,
            email:this.email,
            roles:this.roles || []
        }

        return Jwt.sign(payload);
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
        this.token_expired_at =  expired;

        return this.token;
    }

    public checkToken(token: string): boolean {
      return token === this.token && new Date() <= this.tokenExpiredAt;
    }
  }