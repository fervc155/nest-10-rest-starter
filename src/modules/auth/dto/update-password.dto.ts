import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
  

export class UpdatePasswordDto {

	@IsNotEmpty()
	token:string;


	@MinLength(8)
	password:string;	

	@MinLength(8)
	password_confirmation:string;
}