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
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        color: '#fff',
        textAlign: 'center',
        p: 3,
      }}
    >
      <Container maxWidth="md">
        {/* Animated Typography */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography variant="h2" fontWeight="bold" gutterBottom>
            Welcome to <span style={{ color: '#FFD700' }}>NeoLearn</span>
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <Typography variant="h5" color="inherit" paragraph>
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
              mt: 3,
              background: 'linear-gradient(45deg, #ff6b6b, #ff9a9e)',
              color: '#fff',
              fontWeight: 'bold',
              px: 4,
              py: 1.5,
              fontSize: '1.2rem',
              boxShadow: '0px 4px 20px rgba(0,0,0,0.3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #ff9a9e, #ff6b6b)',
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
