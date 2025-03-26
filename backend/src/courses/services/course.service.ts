import { BadRequestException, Injectable, InternalServerErrorException, ParseIntPipe } from "@nestjs/common";
import { CourseRepository } from "../repositories/course.repository";
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { Course } from "../entities/course.entity";
import { CreateCourseDto } from "../dtos/createCourse.dto";
import * as ffmpeg from 'fluent-ffmpeg';

@Injectable()
export class CourseService{
    constructor(private readonly courseRepository: CourseRepository) {}

    async uploadVideoAndCreateCourse(file: Express.Multer.File, courseDto: Partial<CreateCourseDto>): Promise<{success: boolean; message: string; course: any}> {
        try{
            if (!file) {
                throw new Error('Video file is required');
            }

            // Validate that required fields are present
            const { title, instructor_id, instructor_name, description } = courseDto;

            if (!title || !instructor_id || !instructor_name || !description) {
                throw new BadRequestException('Missing required course fields');
            }
            
            // Generate video URL
            const videoFilename = `${Date.now()}-${file.originalname.replace(/\s/g, '_')}`;
            const videoUrl = `/videos/${videoFilename}`;

            // Get video duration
             const videoPath = join(__dirname, '..', 'uploads/videos', videoFilename);
            const duration = await this.getVideoDuration(videoPath);
    
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

    getVideoDuration(filePath: string): Promise<number> {
        return new Promise((resolve, reject) => {
            ffmpeg.ffprobe(filePath, (err, metadata) => {
                if (err) reject(err);
                else resolve(metadata.format.duration); // Returns duration in seconds
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
    
    //   async getCourseById(id: string) {
    //     return await this.courseRepository.findOne({ where: { id } });
    //   }
}




