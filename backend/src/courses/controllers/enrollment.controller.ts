import { Controller, UseGuards, Post, Req, Body } from "@nestjs/common";
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

}