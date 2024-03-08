import { Injectable } from '@nestjs/common';
import { UserService } from '@/modules/user/user.service';
import * as Responses from '@/app/response';
import Email from '@/app/emails'
import * as shortid from 'shortid';


@Injectable()
export class AuthService {
  constructor(private userService: UserService) {

  }


  async register(createDto:any) {

    let {email, password, password_confirmation} = createDto;

    if(password != password_confirmation) {
      Responses.badRequest("Las password no coinciden");
    }

    let user= await this.userService.create(createDto);
    Email.send(email, 'Nuevo registro de usuario', {username: email}, "welcome")
  }


  async login(loginDto:any) {

    let user = await this.userService.where({email:loginDto['email']})

    if(user.length<1) {
      Responses.badRequest("Claves incorrectas")
    }

    user = user[0];
    if(!user.matchPassword(loginDto["password"])) {
      Responses.badRequest("Claves incorrectas")
    }


    return user.login();


  }


  async changePassword(emailDto: any) {
    let { email } = emailDto;

    let users = await this.userService.where({email});


    if(users.length) {
      let user = users[0]
      let token =user.generateToken();
      this.userService.update(user.id, {
        ...user
      });

      Email.send(email, "Reestablecer contraseña", { body : `Ingresa la siguiente password donde se requiera  ${token}`})
      
    }

    return "correo enviado correctamente"
  }  

  async updatePassword(updatePasswordDto: any) {

    let {token, password, password_confirmation}  = updatePasswordDto;

    if(password!= password_confirmation) {
      Responses.badRequest("Las password no coinciden")
    }

    let users = await this.userService.where({token});


    if(users.length) {

      let user = users[0]

      if(user.checkToken(token)) {

        await this.userService.update(user.id, {
          password,
          token:null,
          tokenExpiresAt:null,
        })

        return "password actualizada"
      }
      
    }

    Responses.badRequest("Token expirado")


  }
 

  async sendEmailVerification(emailDto:any) {
  let { email } = emailDto;

    let users = await this.userService.where({email});

    if(users.length) {
      let user = users[0]

      if(user.emailVerified) {
        Responses.badRequest("Email ya verificado")
      }

      let token =user.generateToken(24);
      this.userService.update(user.id, user as any);

      Email.send(email, "Verificar correo", { body : `Ingresa la siguiente password donde se requiera  ${token}`})
      
    }

    return "correo enviado correctamente"
  } 


  async emailVerification(token: string) {

    let users = await this.userService.where({token});

    if(users.length) {

      let user = users[0]

      if(user.checkToken(token)) {

        await this.userService.update(user.id, {
          emailVerified:new Date,
          token:null,
          tokenExpiresAt:null,
        })

        return "Email verificado"
      }
      
    }

    Responses.badRequest("Token expirado")

  }
 
}
