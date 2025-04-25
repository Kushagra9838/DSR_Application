import { Injectable, NotFoundException } from '@nestjs/common';
import { DsrDto } from './dto/dsr.dto';
import { Dsr } from './schema/dsr.schema';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateDsrDto } from './dto/update-dsr.dto';
import { Op } from 'sequelize';


@Injectable()
export class DsrService {

    constructor(@InjectModel(Dsr) private DsrModel: typeof Dsr) { }

    async addDsr(dsrDto: DsrDto, userId: string) {
        const dsr = await this.DsrModel.create({ ...dsrDto, userId } as any);
        if (!dsr) {
            return { message: "Unable to save DSR" };
        }
        return { message: "DSR saved" };
    }

    async updateDsr(dsrId: string, updateDto: UpdateDsrDto, userId: string) {
        const dsr = await this.DsrModel.findOne({ where: { id: dsrId, userId } });

        if (!dsr) {
            throw new NotFoundException('DSR not found');
        }

        await this.DsrModel.update(
            { content: updateDto.content, hours: updateDto.hours },
            { where: { id: dsrId, userId } }
          );
          
          const updatedDsr = await this.DsrModel.findOne({ where: { id: dsrId, userId } });
          
          return { message: 'DSR updated successfully', dsr: updatedDsr };
          
    }


    async getDsrs({ userId, startDate, endDate, page, limit }) {
        const whereClause: any = { userId };

        if (startDate || endDate) {
            whereClause.createdAt = {};
            if (startDate) whereClause.createdAt[Op.gte] = new Date(startDate);
            if (endDate) whereClause.createdAt[Op.lte] = new Date(endDate);
        }

        const offset = (page - 1) * limit;

        const { count, rows } = await this.DsrModel.findAndCountAll({
            where: whereClause,
            order: [['createdAt', 'DESC']],
            limit: Number(limit),
            offset: Number(offset),
        });

        return {
            total: count,
            page: Number(page),
            limit: Number(limit),
            data: rows,
        };
    }

    async getDsrById(id: string) {
        const dsr = await this.DsrModel.findOne({ where: { id } });
        if (!dsr) {
            return { message: "DSR does not exist" };
        }
        return dsr;
    }

}
