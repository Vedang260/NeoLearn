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
    BadRequestException,
  } from '@nestjs/common';
import { CreateCourseDto } from "../dtos/createCourse.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt_auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { UserRole } from "src/common/enums/roles.enum";
import { Roles } from "src/common/decorators/roles.decorator";
import { diskStorage } from "multer";

@Controller('courses')
@UseGuards(JwtAuthGuard)
export class CourseController {
    constructor(private readonly courseService: CourseService){}

    @Post('create')
    @UseGuards(RolesGuard)
    @Roles(UserRole.INSTRUCTOR)
    @UseInterceptors(FileInterceptor('video', {
        storage: diskStorage({
            destination: './uploads/videos',
            filename: (req, file, cb) => {
                const filename = `${Date.now()}-${file.originalname}`;
                cb(null, filename);
            }
        }),
        limits: { fileSize: 1024 * 1024 * 500 },
        fileFilter: (req, file, cb) => {
            if (!file.mimetype.includes('video')) {
                return cb(new BadRequestException('Only video files are allowed'), false);
            }
            cb(null, true);
        }
    }))
    async createCourse(@UploadedFile() file: Express.Multer.File, @Body() courseData: Partial<CreateCourseDto>){
        return await this.courseService.uploadVideoAndCreateCourse(file, courseData);
    }

    @Get()
    async getAllCourses(){
        return await this.courseService.getAllCourses();
    }
}