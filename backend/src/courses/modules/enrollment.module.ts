// course.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from '../entities/course.entity';
import { EnrollmentService } from '../services/enrollment.service';
import { EnrollmentController } from '../controllers/enrollment.controller';
import { EnrollmentRepository } from '../repositories/enrollment.repository';
import { Enrollment } from '../entities/enrollment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Enrollment])],
  providers: [EnrollmentService, EnrollmentRepository],
  controllers: [EnrollmentController],
  exports: [EnrollmentService, EnrollmentRepository],
})
export class EnrollmentModule {}