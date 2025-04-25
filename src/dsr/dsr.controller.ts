import {
    Body,
    Controller,
    Get,
    Logger,
    Param,
    Post,
    Put,
    Query,
    Req,
    UseGuards,
    Version
} from '@nestjs/common';
import { DsrDto } from './dto/dsr.dto';
import { DsrService } from './dsr.service';
import { JwtAuthGuard } from 'src/commons/guards/jwt.guards';
import { UpdateDsrDto } from './dto/update-dsr.dto';

interface AuthenticatedRequest extends Request {
    user: {
        id: string
    };
}

@Controller({path:'dsr', version: '1'})
export class DsrController {
    private readonly logger = new Logger(DsrController.name);

    constructor(private readonly dsrService: DsrService) {}

   
    @UseGuards(JwtAuthGuard)
    @Post()
    addDsr(@Body() dsrDto: DsrDto, @Req() req: AuthenticatedRequest) {
        this.logger.log(`Add DSR request by user: ${req.user.id}`);
        return this.dsrService.addDsr(dsrDto, req.user.id);
    }

    
    @UseGuards(JwtAuthGuard)
    @Put()
    async updateDsr(
        @Body() updateDsrDto: UpdateDsrDto,
        @Query('id') dsrId: string,
        @Req() req: AuthenticatedRequest,
    ) {
        const userId = req.user.id;
        this.logger.log(`Update DSR request by user: ${userId}, DSR ID: ${dsrId}`);
        return this.dsrService.updateDsr(dsrId, updateDsrDto, userId);
    }

    
    @UseGuards(JwtAuthGuard)
    @Get()
    async getDsrs(
        @Req() req: AuthenticatedRequest,
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
        @Query('page') page = 1,
        @Query('limit') limit = 10,
    ) {
        const userId = req.user.id;
        this.logger.log(`Get DSRs for user: ${userId}, Dates: ${startDate} - ${endDate}, Page: ${page}, Limit: ${limit}`);
        return this.dsrService.getDsrs({ userId, startDate, endDate, page, limit });
    }

  
    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    async getDsrById(@Param("id") id: string) {
        this.logger.log(`Get DSR by ID: ${id}`);
        return await this.dsrService.getDsrById(id);
    }
}