import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Course } from "../entities/course.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCourseDto } from "../dtos/createCourse.dto";
import { CourseStatus } from "src/common/enums/courseStatus.enum";

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
            return await this.courseRepository.find({
                where: {status: CourseStatus.OPEN}
            });
        }catch(error){
            console.error('Error in fetching all the courses');
            throw new InternalServerErrorException('Error in fetching all the courses');
        }
    }

    async deleteCourse(id: string): Promise<boolean>{
        try{
            const res = await this.courseRepository.delete(id);
            return (res.affected  && res.affected > 0 ? true : false); 
        }catch(error){
            console.error('Error in deleting the course: ', error.message);
            throw new InternalServerErrorException('Error in deleting the course: ');
        }
    }

    async updateCourseStatus(id: string, status: CourseStatus): Promise<boolean>{
        try{
            const updateResult = await this.courseRepository.update(id, { status });
            return (updateResult.affected && updateResult.affected > 0 ? true : false)
        }catch(error){
            console.error('Error in updating course status: ', error.message);
            throw new InternalServerErrorException('Error in updating the course');
        }
    }

    async getAllCoursesForInstructor(instructor_id: string){
        try{
            return await this.courseRepository.findBy({ instructor_id });
        }catch(error){
            console.error('Error in getting courses: ', error.message);
            throw new InternalServerErrorException('Error in getting the course');
        }
    }
}