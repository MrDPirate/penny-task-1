import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../user/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';

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

  const payload = { username: user.username, sub: user._id };
  const token = await this.jwtService.signAsync(payload);

  return { access_token: token };
}
}
