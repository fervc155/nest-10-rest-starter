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
