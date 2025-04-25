import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './model/user.model';
import { S3Service } from 'src/s3/s3.service';

@Module({
  imports:[
    SequelizeModule.forFeature([User])
  ],
  controllers: [UserController],
  providers: [UserService, S3Service],
  exports: [UserService]
})
export class UserModule {}
