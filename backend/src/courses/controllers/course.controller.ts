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
    Req,
    Delete,
    Put,
  } from '@nestjs/common';
import { CreateCourseDto } from "../dtos/createCourse.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt_auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { UserRole } from "src/common/enums/roles.enum";
import { Roles } from "src/common/decorators/roles.decorator";
import { diskStorage } from "multer";
import { CourseStatus } from "src/common/enums/courseStatus.enum";

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
                const filename = `${Date.now()}-${file.originalname.replace(/\s/g, '_')}`;
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

    @Get('/instructor')
    @UseGuards(RolesGuard)
    @Roles(UserRole.INSTRUCTOR)
    async getAllCoursesForInstructor(@Req() req: Request){
        return await this.courseService.getAllCoursesForInstructor(req['user'].userId);
    }

    @Delete(':id')
    @UseGuards(RolesGuard)
    @Roles(UserRole.INSTRUCTOR)
    async deleteCourse(@Param('id') id: string){
        return await this.courseService.deleteCourse(id);
    }

    @Put(':id')
    @UseGuards(RolesGuard)
    @Roles(UserRole.INSTRUCTOR)
    async updateCourseStatus(@Param('id') id: string, @Body() status: CourseStatus){
        return await this.courseService.updateCourse(id, status);
    }
}