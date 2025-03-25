import { Injectable } from "@nestjs/common";
import { Course } from "../entities/course.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class CourseRepository{
    constructor(
            @InjectRepository(Course)
            private readonly courseRepository: Repository<Course>,
    ) {}    
    
    async createCourse(){
        try{
            const course = this.courseRepository.create();
            
        }catch(error){

        }

    }
}