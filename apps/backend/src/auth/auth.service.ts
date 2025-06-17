import { Injectable, BadRequestException, ConflictException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../app/user/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

async signup(dto: CreateUserDto) {
  const email = dto.email.toLowerCase();
  const { password, username } = dto;

  const existing = await this.userModel.findOne({ email });
  if (existing) {
    throw new ConflictException('هذا البريد الإلكتروني مستخدم مسبقًا.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new this.userModel({
    email,
    username,
    password: hashedPassword,
  });

  await user.save();

  return { message: 'تم إنشاء الحساب بنجاح' };
}

async signin(dto: CreateUserDto) {
  const email = dto.email.toLowerCase();
  const { password } = dto;

  const user = await this.userModel.findOne({ email });
  if (!user) throw new UnauthorizedException('بيانات الدخول غير صحيحة');

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch)
    throw new UnauthorizedException('بيانات الدخول غير صحيحة');

  const payload = { username: user.username, sub: user._id, email: user.email, };
  const token = await this.jwtService.signAsync(payload);

  return { access_token: token };
}

async sendResetLink(email: string) {
  const user = await this.userModel.findOne({ email });
  if (!user) throw new NotFoundException('User not found');

  const token = await this.jwtService.signAsync(
    { sub: user._id },
    { expiresIn: '10m' }
  );

  const resetLink = `http://localhost:4200/reset-password?token=${token}`;

  console.log('🔗 Reset link:', resetLink);

  return { message: 'Reset link sent to email' };
}

async resetPassword(dto: ResetPasswordDto) {
  const payload = await this.jwtService.verifyAsync(dto.token);
  const user = await this.userModel.findById(payload.sub);
  if (!user) throw new NotFoundException('User not found');

  const hashed = await bcrypt.hash(dto.newPassword, 10);
  user.password = hashed;
  await user.save();

  return { message: 'Password reset successful' };
}

async getAllUsers() {
  const users = await this.userModel.find({}, { password: 0 });
  return users;
}


async changePassword(userId: string, dto: ChangePasswordDto) {
  const user = await this.userModel.findById(userId);

  if (!user) {
    throw new NotFoundException('المستخدم غير موجود');
  }

  const isMatch = await bcrypt.compare(dto.oldPassword, user.password);
  if (!isMatch) {
    throw new BadRequestException('كلمة المرور القديمة غير صحيحة');
  }

  const newHashedPassword = await bcrypt.hash(dto.newPassword, 10);
  user.password = newHashedPassword;
  await user.save();

  return { message: 'تم تغيير كلمة المرور بنجاح' };
}

}
