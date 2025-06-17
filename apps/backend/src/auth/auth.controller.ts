import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: CreateUserDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  async signin(@Body() dto: CreateUserDto) {
    return this.authService.signin(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req: any) {
    return req.user;
  }

  @Post('forgot-password')
  forgotPassword(@Body('email') email: string) {
    return this.authService.sendResetLink(email);
  }

  @Post('reset-password')
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }

@UseGuards(JwtAuthGuard)
@Post('change-password')
changePassword(@Req() req, @Body() dto: ChangePasswordDto) {
  console.log('🔒 USER FROM TOKEN:', req.user);
  return this.authService.changePassword(req.user.sub, dto);
}

@UseGuards(JwtAuthGuard)
@Get('users')
getAllUsers() {
  return this.authService.getAllUsers();
}


}
