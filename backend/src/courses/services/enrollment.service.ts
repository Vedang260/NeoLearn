import { Injectable } from "@nestjs/common";
import { EnrollmentRepository } from "../repositories/enrollment.repository";
import { EnrolledCourseStatus } from "src/common/enums/courseStatus.enum";
import { Course } from "../entities/course.entity";
import { Enrollment } from "../entities/enrollment.entity";

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

    async getAllEnrolledCourses(user_id: string) : Promise<{ success: boolean; message: string; enrolledCourses: any}>{
        try{
            const courses = await this.enrollmentRepository.getAllEnrolledCourses(user_id);
            return {
                success: true,
                message: 'Start completing your courses',
                enrolledCourses: courses
            }
        }catch(error){
            console.error('Error in getting the enrolled courses: ', error.message);
            return{
                success: false,
                message: error.message,
                enrolledCourses: null
            }
        }
    }

    async updateEnrolledCourse(id: string, video_time_watched: number, duration: number): Promise<{success: boolean; message: string;}>{
        try{
            // Calculate progress percentage (rounded to 2 decimal places)
            let progress = parseFloat(((video_time_watched / duration) * 100).toFixed(2));
            let status = EnrolledCourseStatus.IN_PROGRESS;
            // Ensure progress doesn't exceed 100%
            progress = Math.min(progress, 100);
            video_time_watched = video_time_watched;
            if(progress === 100.00){
                status = EnrolledCourseStatus.COMPLETED;
            }
            await this.enrollmentRepository.updateEnrolledCourse(id, video_time_watched,progress, status);
            return {
                success: true,
                message: 'Your course status is updated successfully'
            }
        }catch(error){
            console.error('Error in updating the course status: ', error.message);
            return {
                success: false,
                message: error.message
            }
        }
    }

    async getEnrolledCourse(id: string): Promise<{success: boolean; message: string; course: Enrollment | null}>{
        try{
            const course = await this.enrollmentRepository.getEnrolledCourse(id);
            return{
                success: true,
                message: 'Start completing your course',
                course: course
            }
        }catch(error){
            console.error('Error in fetching the course', error.message);
            return {
                success: false,
                message: error.message,
                course: null
            }
        }
    }
}