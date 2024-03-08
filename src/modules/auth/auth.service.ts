import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthService} from '@/modules/user/user.service';
import * as Responses from '@/app/response';

@Injectable()
export class AuthService {
  constructor(userService: userService) {

  }


  async create(createDto:any) {

    if(createDto['password'] != createDto['password_confirmation']) {
      Responses.badRequest("Las password no coinciden");
    }

    createDto
    return await this.userService.create(createDto);
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
 
}
