import { Injectable, ConflictException, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobAd } from '../entities/job-ad.entity';
import { Response } from 'express';

@Injectable()
export class JobAdService {
  constructor(
    @InjectRepository(JobAd)
    private jobAdRepository: Repository<JobAd>,
  ) {}

  async findAll(filter?: {
    _start?: number;
    _end?: number;
    status?: string;
    title?: string;
    title_like?: string;
  }): Promise<{ jobAds: JobAd[]; total: number }> {
    const { _start, _end, status, title, title_like } = filter || {};

    const queryBuilder = this.jobAdRepository.createQueryBuilder('job_ad');

    if (_start !== undefined && _end !== undefined) {
      const offset = _start;
      const limit = _end - _start + 1;
      queryBuilder.skip(offset).take(limit);
    }

    if (status) {
      queryBuilder.andWhere('job_ad.status = :status', { status });
    }

    if (title_like) {
      queryBuilder.andWhere('LOWER(job_ad.title) LIKE LOWER(:title)', {
        title: `%${title_like}%`,
      });
    }

    if (title) {
      const lowercaseTitle = title.toLowerCase();
      queryBuilder.andWhere('LOWER(job_ad.title) = :lowercaseTitle', {
        lowercaseTitle,
      });
    }

    const [jobAds, total] = await queryBuilder.getManyAndCount();

    return { jobAds, total };
  }

  async findOne(id: number): Promise<JobAd> {
    return this.jobAdRepository.findOneBy({ id: id });
  }

  async create(jobAd: JobAd): Promise<JobAd> {
    try {
      return await this.jobAdRepository.save(jobAd);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Ad with the same title already exists.');
      }
      throw error;
    }
  }

  async update(id: number, ad: JobAd): Promise<JobAd> {
    await this.jobAdRepository.update(id, ad);
    return this.jobAdRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    await this.jobAdRepository.delete(id);
  }
}
