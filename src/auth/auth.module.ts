import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './jwt.strategy';
import { RedisProvider } from 'src/redis/redis.provider';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports:[
    UserModule,
    LoggerModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'yourSecretKey',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RedisProvider],
  exports: ['REDIS_CLIENT'],
})
export class AuthModule {}
