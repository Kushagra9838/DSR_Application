import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'
import { User } from 'src/user/model/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import { ForgetPasswordDto } from './dto/forgetPassword.dto';
import Redis from 'ioredis';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService,
        @Inject('REDIS_CLIENT') private readonly redis: Redis
        // @InjectModel(User) private userModel: typeof User
    ) { }

    private transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
          user: 'kushagra.gupta@appinventiv.com',
          pass: 'aizn yfxu vbte ifpv',
        },
      });

    async signup(signupDto: SignupDto) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(signupDto.password, saltRounds);
        await this.userService.create({
            ...signupDto,
            password: hashedPassword,
        });
        return { message: 'User created successfully'};
    }

    async login(loginDto: LoginDto) {
        const user= await this.userService.findByEmail(loginDto.email);
        console.log(user);
        if(!user){
            return {message: "User does not exist"};
        }
        const isPasswordCorrect = await bcrypt.compare(loginDto.password, user.dataValues.password);

        if(!isPasswordCorrect){
            return {message: "Wrong credentials"};
        }

        const payload = {sub: user.id};
        const token = this.jwtService.sign(payload);
        return {message: "Login successful", Token: token};
    }


    async forgetPassword(forgetPasswordDto: ForgetPasswordDto){
        return await this.userService.changePassword(forgetPasswordDto);
    }

    async sendOtp(email: string) {
        console.log(email);
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const key = `otp:${email}`;
      
        await this.redis.set(key, otp, 'EX', 300);
      
        const mailOptions = {
          from: '"kushagra.gupta@appinventiv.com>',
          to: email,
          subject: 'Your OTP Code',
          text: `Your OTP code is: ${otp}`,
          html: `<b>Your OTP code is:</b> <h2>${otp}</h2>`,
        };
      
        // Send email
        await this.transporter.sendMail(mailOptions);
      
        return { message: 'OTP sent successfully' };
      }

      async verifyOtp(email: string, submittedOtp: string) {
        const key = `otp:${email}`;
        const storedOtp = await this.redis.get(key);
      
        if (!storedOtp) {
          throw new UnauthorizedException('OTP expired or not found');
        }
        if (storedOtp !== submittedOtp) {
          throw new UnauthorizedException('Invalid OTP');
        }
        await this.redis.del(key);
      
        return { message: 'OTP verified successfully' };
      }
      
      
}
