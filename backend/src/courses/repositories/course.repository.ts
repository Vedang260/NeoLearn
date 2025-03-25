import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Course } from "../entities/course.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCourseDto } from "../dtos/createCourse.dto";

@Injectable()
export class CourseRepository{
    constructor(
            @InjectRepository(Course)
            private readonly courseRepository: Repository<Course>,
    ) {}    
    
    async createCourse(createCourseDto: CreateCourseDto): Promise<Course | null>{
        try{
            const course = this.courseRepository.create(createCourseDto);
            return await this.courseRepository.save(course);
        }catch(error){
            console.error('Error in creating a new course', error.message);
            throw new InternalServerErrorException('Error in creating a new Course');
        }
    }

    async getAllCourses(): Promise<Course[] | null>{
        try{
            return await this.courseRepository.find();
        }catch(error){
            console.error('Error in fetching all the courses');
            throw new InternalServerErrorException('Error in fetching all the courses');
        }
    }
}