import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import Navbar from '../components/Navbar';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h1" gutterBottom>
          Welcome to NeoLearn
        </Typography>
        <Typography variant="h5" color="textSecondary" paragraph>
          Empowering education with cutting-edge technology.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate('/register')}
        >
          Get Started
        </Button>
      </Container>
    </>
  );
};

export default Home;