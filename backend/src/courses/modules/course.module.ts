// course.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from '../entities/course.entity';
import { CourseService } from '../services/course.service';
import { CourseController } from '../controllers/course.controller';
import { CourseRepository } from '../repositories/course.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Course])],
  providers: [CourseService, CourseRepository],
  controllers: [CourseController],
  exports: [CourseService, CourseRepository],
})
export class CourseModule {}