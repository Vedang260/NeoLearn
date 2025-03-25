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
}