import React, { useEffect } from 'react';
import { Container, Typography, Box, Card, CardContent, Button } from '@mui/material';
import { useSelector } from 'react-redux';
//import { RootState } from '../redux/store';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const InstructorDashboard: React.FC = () => {
  //const { role, token } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

//   useEffect(() => {
//     if (!token || role !== 'instructor') {
//       navigate('/login');
//     }
//   }, [token, role, navigate]);

  // Mock created courses
  const createdCourses = [
    { title: 'React Basics', status: 'Open' },
    { title: 'TypeScript Mastery', status: 'Closed' },
  ];

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" gutterBottom>
          Instructor Dashboard
        </Typography>
        <Button variant="contained" color="primary" sx={{ mb: 4 }}>
          Create New Course
        </Button>
        <Box>
          {createdCourses.map((course, index) => (
            <Card key={index} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6">{course.title}</Typography>
                <Typography>Status: {course.status}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </>
  );
};

export default InstructorDashboard;