import { BadRequestException, Injectable, InternalServerErrorException, ParseIntPipe } from "@nestjs/common";
import { CourseRepository } from "../repositories/course.repository";
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { Course } from "../entities/course.entity";
import { CreateCourseDto } from "../dtos/createCourse.dto";
import * as ffmpeg from 'fluent-ffmpeg';
import { CourseStatus } from "src/common/enums/courseStatus.enum";
import * as ffmpegPath from 'ffmpeg-static';
import * as ffprobePath from 'ffprobe-static';
import { normalize } from 'path';
import { existsSync, mkdirSync } from 'fs';

// Initialize early in your application
ffmpeg.setFfprobePath(ffprobePath.path);
// Set the paths at application startup
ffmpeg.setFfmpegPath(ffmpegPath);

@Injectable()
export class CourseService{
    private readonly uploadDir: string;
    constructor(private readonly courseRepository: CourseRepository) {
        this.uploadDir = normalize(join(process.cwd(), 'uploads', 'videos'));
        this.ensureUploadDirExists();
    }

    private ensureUploadDirExists() {
        if (!existsSync(this.uploadDir)) {
            mkdirSync(this.uploadDir, { recursive: true });
        }
    }

    async uploadVideoAndCreateCourse(file: Express.Multer.File, instructor_id: string, courseDto: Partial<CreateCourseDto>): Promise<{success: boolean; message: string; course: any}> {
        try{
            if (!file) {
                throw new Error('Video file is required');
            }

            // Validate that required fields are present
            const { title, instructor_name, description } = courseDto;

            if (!title || !instructor_id || !instructor_name || !description) {
                throw new BadRequestException('Missing required course fields');
            }
            
            // Generate video URL
            // 2. Use the actual saved file path (Multer already saved it)
        const videoUrl = `/videos/${file.filename}`;
        const videoPath = join(this.uploadDir, file.filename);

        console.log('Video path:', videoPath); // Debugging
        console.log('File exists:', existsSync(videoPath));
             // 3. Verify upload directory exists (should be done in controller)
            if (!existsSync(join(process.cwd(), 'uploads', 'videos'))) {
                throw new InternalServerErrorException('Upload directory not configured');
            }

            // 3. Get duration and round to nearest integer
            let duration = 0;
            
            const rawDuration = await this.getVideoDuration(videoPath);
            duration = Math.round(rawDuration); // Round to nearest integer
            console.log('Raw duration:', rawDuration, 'Rounded duration:', duration);
  
            // Continue with duration 0 if calculation fails
        
            // Ensure the status field is correctly mapped
            // Ensure courseData matches CreateCourseDto type
            const courseData: CreateCourseDto = {
                title,
                instructor_id,
                instructor_name,
                duration: Number(duration),
                description,
                video_url: videoUrl, // Add generated video URL
            };
          const course = await this.courseRepository.createCourse(courseData);
          
          return { 
            success: true, 
            message: 'Course created successfully',
            course: course
        };
        } catch (error) {
          console.error('Error in creating course:', error.message);
          throw new InternalServerErrorException('Error in creating a new course');
        }
    }

    async getVideoDuration(filePath: string): Promise<number> {
        if (!existsSync(filePath)) {
            console.error('File not found at path:', filePath);
            return 0;
        }

        return new Promise((resolve) => {
            ffmpeg.ffprobe(filePath, (err, metadata) => {
                if (err) {
                    console.error('FFprobe error:', err);
                    resolve(0);
                } else {
                    resolve(metadata.format.duration || 0);
                }
            });
        });
    }
    
    async getAllCourses(): Promise<{success: boolean; message: string; courses: Course[] | null}> {
        try{
            const courses = await this.courseRepository.getAllCourses();
            return {
                success: true,
                message: 'Explore our courses',
                courses: courses
            }
        }catch(error){
            console.error('Error in getting all courses:', error.message);
            throw new InternalServerErrorException('Error in getting all courses');
        }
    }

    async deleteCourse(course_id: string): Promise<{success: boolean; message: string; }>{
        try{
            const res = await this.courseRepository.deleteCourse(course_id);
            if(res){
                return {
                    success: true,
                    message: 'Course is deleted successfully'
                }
            }
            return{
                success: false,
                message: 'Error in deleting course'
            }
        }catch(error){
            console.error('Error in deleting the course: ', error.message);
            return{
                success: false,
                message: error.message
            }
        }
    }
    //   async getCourseById(id: string) {
    //     return await this.courseRepository.findOne({ where: { id } });
    //   }

    async updateCourse(course_id: string, status: CourseStatus): Promise<{success: boolean; message: string;}>{
        try{
            await this.courseRepository.updateCourseStatus(course_id, status);
            return {
                success: true,
                message: 'Your course is updated successfully'
            }
        }catch(error){
            console.error('Error in updating the course status: ', error.message);
            return {
                success: false,
                message: error.message
            }
        }
    }

    async getAllCoursesForInstructor(instructor_id: string): Promise<{success: boolean; message: string; instructorCourses: any}>{
        try{
            const courses = await this.courseRepository.getAllCoursesForInstructor(instructor_id);
            return {
                success: true,
                message: 'Manage your courses',
                instructorCourses: courses
            }
        }catch(error){
            console.error('Error in fetching the instructor courses: ', error.message);
            return {
                success: false,
                message: error.message,
                instructorCourses: null
            }
        }
    }
}




