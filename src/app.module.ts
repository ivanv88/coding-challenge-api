import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobAdModule } from './job-ad/job-ad.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'jobaduser',
      password: 'jobpassword',
      database: 'jobad',
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true,
    }),
    JobAdModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
