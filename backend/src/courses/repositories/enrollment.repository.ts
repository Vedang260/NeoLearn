import { Repository } from "typeorm";
import { Enrollment } from "../entities/enrollment.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, InternalServerErrorException } from "@nestjs/common";

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
}