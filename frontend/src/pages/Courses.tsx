import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Card, CardContent, CardMedia, LinearProgress, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { enrollStudent, getAllCourses } from '../services/courses/api';
import { toast } from 'react-toastify';
import { Course } from '../types/course';

const Courses: React.FC = () => {
  const { user, token } = useSelector((state: RootState) => state.auth);
  const [courses, setCourses] = useState<Course[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
    fetchAllCourses();
  }, [token, user?.role, navigate]);

  const fetchAllCourses = async() => {
    try{
      const response = await getAllCourses();
      if(response.data.success){
        setCourses(response.data.courses);
        toast.success(response.data.message);
      }else{
        toast.error(response.data.message);
      }
    }catch(error){
        toast.error('Failed to fetch the courses');
    }
  }

    const handleEnroll = async (course_id: string) => {
        try{
            const response = await enrollStudent({course_id});
            if(response.data.success){
              toast.success(response.data.message);
              navigate('/dashboard');
            }else{
              toast.error(response.data.message);
            }
          }catch(error){
              toast.error('Failed to fetch the courses');
          }
    }

    const formatDuration = (seconds: number) => {
        const hours = Math.floor(seconds / 3600); // Get total hours
        const minutes = Math.floor((seconds % 3600) / 60); // Get remaining minutes
      
        return `${hours}h ${minutes}m`;
    };
      

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Dashboard Title */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{
              textAlign: 'center',
              color: '#FFD700',
              textShadow: '3px 3px 15px rgba(255, 255, 255, 0.3)',
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            Starting Upgrading Your Skills 🚀
          </Typography>
        </motion.div>

        {/* Courses Section */}
        <Box
          sx={{
            mt: 6,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
            gap: 4,
          }}
        >
          {courses.map((course) => (
            <motion.div
              key={course.id}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                sx={{
                  background: 'linear-gradient(135deg, #1f1c2c, #928DAB)',
                  color: '#fff',
                  borderRadius: '15px',
                  overflow: 'hidden',
                  boxShadow: '0px 4px 20px rgba(255, 215, 0, 0.3)',
                  cursor: 'pointer',
                }}
                onClick={() => navigate(`/course/${course.id}`, { state: { course } })}
              >
                {/* Course Thumbnail */}
                <CardMedia 
                  component="video" 
                  height="180"
                  src={`http://localhost:8000${course.video_url}`}  
                  controls
                  style={{ objectFit: 'cover', borderRadius: '10px' }}
                />

                <CardContent>
                  {/* Course Title */}
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{
                        fontFamily: 'Poppins, sans-serif',
                        textShadow: '2px 2px 10px rgba(255, 255, 255, 0.2)',
                        overflow: 'hidden', 
                        whiteSpace: 'nowrap', 
                        textOverflow: 'ellipsis',
                        maxWidth: '100%', // Adjust width as needed
                        display: 'block', // Required for ellipsis to work
                    }}
                    >
                    {course.title}
                    </Typography>


                  {/* Duration & Status */}
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Duration: {formatDuration(course.duration)}
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      mt: 1,
                      fontWeight: 'bold',
                      color: course.status === 'Completed' ? '#4CAF50' : '#FFA500',
                    }}
                  >
                    {course.status}
                  </Typography>

                  {/* Enroll Button */}
                  { user?.role === 'student' && (<Button
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 3,
                      background: 'linear-gradient(45deg, #ff6b6b, #ff9a9e)',
                      color: '#fff',
                      fontWeight: 'bold',
                      borderRadius: '30px',
                      boxShadow: '0px 4px 15px rgba(255, 105, 180, 0.3)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #ff4b4b, #ff7e7e)',
                        transform: 'scale(1.05)',
                      },
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEnroll(course.id);
                    }}
                  >
                    Enroll
                  </Button>)}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Box>
      </Container>
    </>
  );
};

export default Courses;
