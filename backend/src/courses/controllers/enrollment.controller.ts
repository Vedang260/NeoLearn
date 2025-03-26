import { Controller, UseGuards, Post, Req, Body, Get, Put, Patch, Param } from "@nestjs/common";
import { EnrollmentService } from "../services/enrollment.service";
import { JwtAuthGuard } from "src/auth/guards/jwt_auth.guard";
import { UserRole } from "src/common/enums/roles.enum";
import { Roles } from "src/common/decorators/roles.decorator";
import { RolesGuard } from "src/auth/guards/roles.guard";

@Controller('enroll')
@UseGuards(JwtAuthGuard)
export class EnrollmentController {
    constructor( private readonly enrollmentService: EnrollmentService){}
    
    @Post()
    @UseGuards(RolesGuard)
    @Roles(UserRole.STUDENT)
    async enrollStudent(@Body() body: {course_id: string}, @Req() req: Request){
        return this.enrollmentService.enrollStudent(body.course_id, req['user'].userId);
    }

    @Get()
    @UseGuards(RolesGuard)
    @Roles(UserRole.STUDENT)
    async getAllEnrolledCourses(@Req() req: Request){
        return this.enrollmentService.getAllEnrolledCourses(req['user'].userId);
    }

    @Patch(':id')
    @UseGuards(RolesGuard)
    @Roles(UserRole.STUDENT)
    async updateEnrolledCourse(@Param('id') id: string, @Body() bodyData: any){
        return this.enrollmentService.updateEnrolledCourse(id, bodyData.video_time_watched, bodyData.duration);
    }
}