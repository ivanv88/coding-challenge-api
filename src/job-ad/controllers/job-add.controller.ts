import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Response,
} from '@nestjs/common';
import { JobAdService } from '../services/job-ad.service';
import { JobAd } from '../entities/job-ad.entity';
import { Response as Res } from 'express';

@Controller('jobs')
export class JobAdController {
  constructor(private readonly adService: JobAdService) {}

  @Get()
  async findAll(
    @Query()
    filter: {
      _start?: number;
      _end?: number;
      status?: string;
      title?: string;
      title_like?: string;
    },
    @Response() res: Res,
  ): Promise<Res> {
    const { jobAds, total } = await this.adService.findAll(filter);
    return res
      .setHeader('Access-Control-Expose-Headers', 'X-Total-Count')
      .setHeader('X-Total-Count', total.toString())
      .json(jobAds);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<JobAd> {
    return this.adService.findOne(id);
  }

  @Post()
  async create(@Body() ad: JobAd): Promise<JobAd> {
    return this.adService.create(ad);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() ad: JobAd): Promise<JobAd> {
    return this.adService.update(id, ad);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.adService.delete(id);
  }
}
