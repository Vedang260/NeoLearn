import { Injectable } from "@nestjs/common";
import { EnrollmentRepository } from "../repositories/enrollment.repository";

@Injectable()
export class EnrollmentService{
    constructor(private readonly enrollmentRepository: EnrollmentRepository){}

    async enrollStudent(course_id: string, user_id: string): Promise<{success: boolean; message: string;}>{
        try{
            const enrollment_date = new Date();
            const newEnrollment = await this.enrollmentRepository.enrollStudent(user_id, course_id, enrollment_date);
            if(newEnrollment){
                return{
                    success: true,
                    message: 'You are enrolled successfully'
                }
            }
            return{
                success: false,
                message: 'Failed to enroll'
            }
        }catch(error){
            console.error('Error in enrollment: ', error.message);
            return{
                success: false,
                message: error.message
            }
        }
    }
}