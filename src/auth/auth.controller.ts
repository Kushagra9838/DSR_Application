import { Body, Controller, Post, Logger, Version } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ForgetPasswordDto } from './dto/forgetPassword.dto';

@Controller({path:'auth', version: '1'})
export class AuthController {

    private readonly logger = new Logger(AuthController.name);

    constructor(
        private readonly authService: AuthService
    ) {}

   
    @Post('signup')
    async Signup(@Body() signupDto: SignupDto) {
        this.logger.log('Signup request received'); 
        try {
            const result = await this.authService.signup(signupDto);
            this.logger.log('Signup successful');
            return result;
        } catch (error) {
            this.logger.error('Signup failed', error.stack);
            throw error;
        }
    }

  
    @Post('login')
    async Login(@Body() loginDto: LoginDto) {
        this.logger.log('Login request received');
        try {
            const result = await this.authService.login(loginDto);
            this.logger.log('Login successful');
            return result;
        } catch (error) {
            this.logger.error('Login failed', error.stack);
            throw error;
        }
    }

   
    @Post('forgetPassword')
    async forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
        this.logger.log('Forget Password request received');
        try {
            const result = await this.authService.forgetPassword(forgetPasswordDto);
            this.logger.log('Forget Password request processed');
            return result;
        } catch (error) {
            this.logger.error('Forget Password failed', error.stack);
            throw error;
        }
    }

    
    @Post('send-otp')
    async sendOtp(@Body() body: { email: string }) {
        this.logger.log(`Send OTP request received for email: ${body.email}`);
        try {
            const result = await this.authService.sendOtp(body.email);
            this.logger.log(`OTP sent to email: ${body.email}`);
            return result;
        } catch (error) {
            this.logger.error('Sending OTP failed', error.stack);
            throw error;
        }
    }

   
    @Post('verify-otp')
    async verifyOtp(@Body() body: { email: string, otp: string }) {
        this.logger.log(`Verify OTP request received for email: ${body.email}`);
        try {
            const result = await this.authService.verifyOtp(body.email, body.otp);
            this.logger.log(`OTP verification successful for email: ${body.email}`);
            return result;
        } catch (error) {
            this.logger.error('OTP verification failed', error.stack);
            throw error;
        }
    }
}