import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/modules/auth/decorators/auth.decorator';
import { ReportService } from '../report.service';
import { UserId } from 'src/modules/auth/decorators/user-id.decorator';
import { CreateReportDTO } from './dto/create-report.dto';

@Auth()
@Controller('report')
@ApiTags('Report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post('')
  @ApiOperation({ summary: 'Create a report' })
  async create(@UserId() userId: number, data: CreateReportDTO) {
    return await this.reportService.create(userId, data);
  }
}
