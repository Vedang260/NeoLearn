export interface EnrolledCourseData {
    id: string;
    user_id: string;
    course_id: string;
    video_time_watched: number;
    progress: number;
    enrollment_date: string;
    status: string;
    course: {
      id: string;
      title: string;
      instructor_name: string;
      duration: number;
      status: string;
      description: string;
      video_url: string;
    };
  }