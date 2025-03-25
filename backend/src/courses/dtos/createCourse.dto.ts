import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { CourseStatus } from "src/common/enums/courseStatus.enum";

export class CreateCourseDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    instructor_id: string;

    @IsNotEmpty()
    @IsString()
    instructor_name: string;

    @IsNotEmpty()
    duration: number;

    @IsNotEmpty()
    @IsEnum(CourseStatus)
    status: CourseStatus;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    video_url: string;
}