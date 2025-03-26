import React, { useEffect } from 'react';
import { Container, Typography, Box, Card, CardContent } from '@mui/material';
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
    { title: 'React Basics', progress: 75 },
    { title: 'TypeScript Mastery', progress: 30 },
  ];

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" gutterBottom>
          Student Dashboard
        </Typography>
        <Box sx={{ mt: 4 }}>
          {enrolledCourses.map((course, index) => (
            <Card key={index} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6">{course.title}</Typography>
                <Typography>Progress: {course.progress}%</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </>
  );
};

export default StudentDashboard;