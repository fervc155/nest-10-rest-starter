import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, UpdatePasswordDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { EmailDto } from '@/app/dto';


@ApiTags("auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('change-password')
  changePassword(@Body() emailDto: EmailDto) {
    return this.authService.changePassword(emailDto);
  }

  @Post('update-password')
  updatePassword(@Body() updatePasswordDto: UpdatePasswordDto) {
    return this.authService.updatePassword(updatePasswordDto);
  }

  @Post('send-email-verification')
  sendEmailVerification(@Body() emailDto: EmailDto) {
    return this.authService.sendEmailVerification(emailDto);
  }

  @Post('email-verification/:token')
  emailVerification(@Param('token') token: string) {
    return this.authService.emailVerification(token);
  }

}
