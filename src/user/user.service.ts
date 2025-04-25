import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './model/user.model';
import { CreateUserDto } from './dto/createUser.dto';
import { ForgetPasswordDto } from 'src/auth/dto/forgetPassword.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {

    constructor(@InjectModel(User) private userModel: typeof User) {}

    async create(user: CreateUserDto) : Promise<User> {
        return await this.userModel.create(user as any);
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.userModel.findOne({ where: { email } });
    }

    async findById(id: string){
        return await this.userModel.findOne({where: { id }});
    }

    async userProfile(id: string){
        return await this.userModel.findOne({where : {id}});
    }

    async changePassword(forgetPasswordDto: ForgetPasswordDto) {
        const { email, newPassword } = forgetPasswordDto;
      
        const user = await this.userModel.findOne({ where: { email } });
        if (!user) {
          throw new NotFoundException('User not found');
        }
      
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
      
        await user.update({ password: hashedPassword });

        return { message: 'Password updated successfully' };
      }

      async updateProfile(userId: number, name?: string, imageUrl?: string) {
        const user = await this.userModel.findByPk(userId);
        if (!user) throw new NotFoundException('User not found');
      
        await user.update({
          name: name ?? user.name,
          profilePicture: imageUrl ?? user.profilePicture,
        });
      
        return { message: 'Profile updated successfully', user };
      }
      
    
}
