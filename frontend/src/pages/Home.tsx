import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1f1c2c, #928DAB)',
        color: '#fff',
        textAlign: 'center',
        p: 3,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Floating Elements */}
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          width: '200px',
          height: '200px',
          background: 'rgba(255, 215, 0, 0.2)',
          borderRadius: '50%',
          top: '10%',
          left: '5%',
          filter: 'blur(80px)',
        }}
      />
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          width: '150px',
          height: '150px',
          background: 'rgba(255, 105, 180, 0.3)',
          borderRadius: '50%',
          bottom: '15%',
          right: '10%',
          filter: 'blur(80px)',
        }}
      />

      <Container maxWidth="md">
        {/* Animated Heading */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography
            variant="h2"
            fontWeight="bold"
            sx={{
              fontFamily: 'Poppins, sans-serif',
              letterSpacing: '2px',
              textShadow: '3px 3px 10px rgba(255, 255, 255, 0.2)',
            }}
            gutterBottom
          >
            Welcome to{' '}
            <span style={{ color: '#FFD700', fontWeight: 'bold' }}>NeoLearn</span>
          </Typography>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <Typography
            variant="h5"
            sx={{
              fontFamily: 'Raleway, sans-serif',
              opacity: 0.9,
            }}
            paragraph
          >
            Empowering education with cutting-edge technology.
          </Typography>
        </motion.div>

        {/* Call to Action Button */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ repeat: Infinity, repeatType: 'reverse', duration: 1 }}
        >
          <Button
            variant="contained"
            sx={{
              mt: 4,
              background: 'linear-gradient(45deg, #ff6b6b, #ff9a9e)',
              color: '#fff',
              fontWeight: 'bold',
              px: 5,
              py: 1.8,
              fontSize: '1.2rem',
              borderRadius: '50px',
              boxShadow: '0px 4px 20px rgba(255, 105, 180, 0.3)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0px 8px 25px rgba(255, 105, 180, 0.5)',
              },
            }}
            onClick={() => navigate('/register')}
          >
            Get Started 🚀
          </Button>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Home;