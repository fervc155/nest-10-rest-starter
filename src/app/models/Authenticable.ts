import Model From './Model';
import bcrypt from 'bcrypt'
import Jwt from '../jwt';


export default class Authenticable extends Model{


    @Column({type:'boolean': default:false})
    email_verified:boolean;

    @Column({nullable:true})
    token:string;

    @Column({type:'date', nullable:true})
    token_expired_at:Date

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

  }