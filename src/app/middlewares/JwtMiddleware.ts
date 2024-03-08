// myMiddleware.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import Jwt from "@/app/jwt";

export const JwtMiddleware= (rolesParam:string="") =>{

  let roles:string[] = [];
  roles = rolesParam.split("|");


  return (req: Request, res: Response, next: NextFunction) =>{
    // Tu lógica de middleware aquí
   
    let jwt = req.headers['authorization'] || false;

    if(jwt) {
      jwt = jwt.replaceAll("Bearer ", "");

      let valid = Jwt.check(jwt);

      if (valid) {

        if(roles.length) {

          if(roles.includes(valid['sub']['roles'])) {
            return next()
          }
        }  else {
          return next();
        }


      }
 
    }

    return  res.status(401).json({ status:false, msg: 'Token caducado' });;

  }
}


