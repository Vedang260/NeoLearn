import { Repository } from "typeorm";
import { Enrollment } from "../entities/enrollment.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { EnrolledCourseStatus } from "src/common/enums/courseStatus.enum";

@Injectable()
export class EnrollmentRepository{
    constructor(
            @InjectRepository(Enrollment)
            private readonly enrollmentRepository: Repository<Enrollment>,
    ) {}

    async enrollStudent(user_id: string, course_id: string, enrollment_date: Date){
        try{
            const newEnrollment = this.enrollmentRepository.create({user_id, course_id,enrollment_date});
            return await this.enrollmentRepository.save(newEnrollment);
        }catch(error){
            console.error('Error in enrollment of course: ', error.message);
            throw new InternalServerErrorException('Error in enrollment');
        }
    }
    
    async getAllEnrolledCourses(user_id: string){
        try{
            const enrollemnts = this.enrollmentRepository.find({
                where: { user_id },
                relations: ['course']
            });
            return enrollemnts;
        }catch(error){
            console.error('Error in retrieving enrollemnts of the user: ', error.message);
            throw new InternalServerErrorException('Error in retrieving all enrollemts');
        }
    }

    async updateEnrolledCourse(id: string, video_time_watched: number, progress: number, status: EnrolledCourseStatus){
        try{
            const enrollment = await this.enrollmentRepository.findOne({ where: { id } });

            if (!enrollment) {
                throw new NotFoundException('enrollment not found');
            }

            enrollment.status = status;
            enrollment.progress = progress;
            enrollment.video_time_watched = video_time_watched;

            return await this.enrollmentRepository.save(enrollment);
        }catch(error){
            console.error('Error in updating the status & progress: ', error.message);
            throw new InternalServerErrorException('Error in updating the status & progress');
        }
    }
}