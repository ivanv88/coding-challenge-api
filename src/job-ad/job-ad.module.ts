import { Module } from '@nestjs/common';
import { JobAdService } from './services/job-ad.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobAdController } from './controllers/job-add.controller';
import { JobAd } from './entities/job-ad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobAd])],
  providers: [JobAdService],
  controllers: [JobAdController],
})
export class JobAdModule {}
