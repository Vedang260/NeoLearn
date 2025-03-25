import { IsNotEmpty, IsString } from "class-validator";

export class createCourseDto {
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
    @IsString()
    status: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    video_url: string;
}