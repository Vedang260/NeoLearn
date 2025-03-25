import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Enrollment } from './enrollment.entity';
import { User } from '../../users/entities/users.entity';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string; // Unique course ID (UUID)

  @Column({ type: 'varchar', length: 100, nullable: false })
  title: string; // Course title (max 100 chars)

  @Column({ type: 'uuid', nullable: false })
  instructor_id: string; // Foreign key to Users table

  @Column({ type: 'varchar', length: 100, nullable: false })
  instructor_name: string; // Instructor name (max 100 chars, for convenience)

  @Column({ type: 'integer', nullable: false })
  duration: number; // Total duration in hours (e.g., 20)

  @Column({
    type: 'enum',
    enum: ['Open', 'Closed', 'Completed'],
    default: 'Open',
    nullable: false,
  })
  status: 'Open' | 'Closed' | 'Completed'; // Enrollment status

  @Column({ type: 'varchar', length: 500, nullable: true })
  description: string; // Optional description (max 500 chars)

  @Column({ type: 'varchar', length: 255, nullable: false })
  video_url: string; // URL to the video (e.g., "/videos/course1.mp4")

  // Many courses belong to one instructor (User)
  @ManyToOne(() => User, (user) => user.courses, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'instructor_id' })
  instructor: User;

  // One course can have many enrollments
  @OneToMany(() => Enrollment, (enrollment) => enrollment.course)
  enrollments: Enrollment[];
}