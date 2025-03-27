import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Card, CardContent, Button } from '@mui/material';
import { useSelector } from 'react-redux';
//import { RootState } from '../redux/store';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import CreateCourseForm from "./CreateCourseForm";

const InstructorDashboard: React.FC = () => {
  //const { role, token } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const [isCourseFormOpen, setIsCourseFormOpen] = useState(false);
  // useEffect(() => {
  //   if (!token || role !== 'instructor') {
  //     navigate('/login');
  //   }
  // }, [token, role, navigate]);

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
        {/* Your Button with onClick handler */}
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 4 }}
        onClick={() => setIsCourseFormOpen(true)}
      >
        Create New Course
      </Button>

      {/* The Course Creation Form Dialog */}
      <CreateCourseForm
        open={isCourseFormOpen}
        onClose={() => setIsCourseFormOpen(false)}
      />
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