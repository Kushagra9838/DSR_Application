import { Body, Controller, Get, Patch, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from 'src/commons/guards/jwt.guards';
import { UserService } from './user.service';
import { Express } from 'express';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from 'src/s3/s3.service';

interface AuthenticatedRequest extends Request {
  user: {
    id: string
  };
}

@Controller({path: 'user', version: '1'})
export class UserController {

  constructor(private readonly userService: UserService,
    private readonly s3Service: S3Service
  ) { }


  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async userProfile(@Req() req: AuthenticatedRequest) {
    // console.log(req.user);
    return await this.userService.userProfile(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  @UseInterceptors(FileInterceptor('profilePicture'))
  async updateProfile(
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
    @Body('name') name: string,
  ) {
    const imageUrl = file ? await this.s3Service.uploadFile(file): undefined;
    console.log("This is image URL", imageUrl);
    return this.userService.updateProfile(req.user.id, name, imageUrl);
  }

}
