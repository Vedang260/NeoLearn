import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { UserRole } from '../../common/enums/roles.enum';
import { Enrollment } from "src/courses/entities/enrollment.entity";
import { Course } from "src/courses/entities/course.entity";

@Entity({ name: 'user' })
export class User{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;
    
    @Column({ type: 'enum', enum: UserRole })
    role: UserRole;

    // One user (instructor) can teach many courses
    @OneToMany(() => Course, (course) => course.instructor)
    courses: Course[];

    // One user can have many enrollments
    @OneToMany(() => Enrollment, (enrollment) => enrollment.user)
    enrollments: Enrollment[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}