import { Module } from '@nestjs/common';
import { DsrService } from './dsr.service';
import { DsrController } from './dsr.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dsr } from './schema/dsr.schema';

@Module({
  imports:[SequelizeModule.forFeature([Dsr])],
  providers: [DsrService],
  controllers: [DsrController]
})
export class DsrModule {}
