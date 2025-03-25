import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/users.entity';
import { Course } from './course.entity';

@Entity('enrollments')
export class Enrollment {
  @PrimaryGeneratedColumn('uuid')
  id: string; // Unique enrollment ID (UUID)

  @Column({ type: 'uuid', nullable: false })
  user_id: string; // Foreign key to Users table

  @Column({ type: 'uuid', nullable: false })
  course_id: string; // Foreign key to Courses table

  @Column({ type: 'float', default: 0, nullable: false })
  video_time_watched: number; // Hours watched (e.g., 5.5)

  @Column({ type: 'float', default: 0, nullable: false })
  progress: number; // Percentage (0-100)

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false })
  enrollment_date: Date; // Date of enrollment

  @Column({
    type: 'enum',
    enum: ['In Progress', 'Completed'],
    default: 'In Progress',
    nullable: false,
  })
  status: 'In Progress' | 'Completed'; // User-specific status

  // Many-to-One relationship with User
  @ManyToOne(() => User, (user) => user.enrollments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  // Many-to-One relationship with Course
  @ManyToOne(() => Course, (course) => course.enrollments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'course_id' })
  course: Course;
}