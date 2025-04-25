import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { DsrModule } from './dsr/dsr.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AuthModule, UserModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345',
      database: 'postgres',
      autoLoadModels: true,
      synchronize: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DsrModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
