import { FileInterceptor } from "@nestjs/platform-express";
import { CourseService } from "../services/course.service";
import {
    Controller,
    Get,
    Post,
    Param,
    UploadedFile,
    UseInterceptors,
    Body,
    UseGuards,
  } from '@nestjs/common';
import { CreateCourseDto } from "../dtos/createCourse.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt_auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { UserRole } from "src/common/enums/roles.enum";
import { Roles } from "src/common/decorators/roles.decorator";

@Controller('courses')
@UseGuards(JwtAuthGuard)
export class CourseController {
    constructor(private readonly courseService: CourseService){}

    @Post('create')
    @UseInterceptors(FileInterceptor('video'))
    @UseGuards(RolesGuard)
    @Roles(UserRole.INSTRUCTOR)
    async createCourse(@UploadedFile() file: Express.Multer.File, @Body() courseData: Partial<CreateCourseDto>){
        return await this.courseService.uploadVideoAndCreateCourse(file, courseData);
    }

    @Get()
    async getAllCourses(){
        return await this.courseService.getAllCourses();
    }
}