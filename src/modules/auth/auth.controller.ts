import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post()
  create(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }


}
