import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
  

export class RegisterDto {

    @IsNotEmpty()
	@IsEmail()
	email:string;

    @MinLength(8)
	password:string;


	@MinLength(8)
	password_confirmation:string;
}



export class LoginDto {
  
    @IsNotEmpty()
	@IsEmail
	email:string;

	@MinLength(8)
	password:string;
}