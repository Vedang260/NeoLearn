import React, { useEffect } from 'react';
import { Container, Typography, Box, Card, CardContent, CardMedia, LinearProgress, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const StudentDashboard: React.FC = () => {
  const { user, token } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || user?.role !== 'student') {
      navigate('/login');
    }
  }, [token, user?.role, navigate]);

  // Mock enrolled courses
  const enrolledCourses = [
    {
      id: 1,
      title: 'React Basics',
      progress: 75,
      status: 'In Progress',
      enrolledDate: '2024-03-12',
      thumbnail: 'https://via.placeholder.com/300x180?text=React+Course',
    },
    {
      id: 2,
      title: 'TypeScript Mastery',
      progress: 30,
      status: 'In Progress',
      enrolledDate: '2024-04-05',
      thumbnail: 'https://via.placeholder.com/300x180?text=TypeScript+Course',
    },
  ];

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
            Your Learning Journey 🚀
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
          {enrolledCourses.map((course) => (
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
                onClick={() => navigate(`/course/${course.id}`)}
              >
                {/* Course Thumbnail */}
                <CardMedia component="img" height="180" image={course.thumbnail} alt={course.title} />

                <CardContent>
                  {/* Course Title */}
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{
                      fontFamily: 'Poppins, sans-serif',
                      textShadow: '2px 2px 10px rgba(255, 255, 255, 0.2)',
                    }}
                  >
                    {course.title}
                  </Typography>

                  {/* Enrolled Date & Status */}
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Enrolled on: {course.enrolledDate}
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

                  {/* Progress Bar */}
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2">Progress: {course.progress}%</Typography>
                    <LinearProgress
                      variant="determinate"
                      value={course.progress}
                      sx={{
                        height: 8,
                        borderRadius: 5,
                        backgroundColor: '#ccc',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: '#FFD700',
                        },
                      }}
                    />
                  </Box>

                  {/* Continue Button */}
                  <Button
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
                      navigate(`/course/${course.id}`);
                    }}
                  >
                    Continue Learning ▶️
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Box>
      </Container>
    </>
  );
};

export default StudentDashboard;
