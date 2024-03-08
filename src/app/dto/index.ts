
import { IsEmail, IsNotEmpty, Validate } from 'class-validator';
import { ExistsEmail } from './validators/ExistsEmail';

export class EmailRequiredDto {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @Validate(ExistsEmail, { message: 'No existe este email en la base de datos' })
  email: string;
}


export class EmailDto {
  email: string;
}