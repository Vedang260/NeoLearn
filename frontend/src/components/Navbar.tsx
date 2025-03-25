import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { logout } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const { role, token } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: 'linear-gradient(135deg, #1f1c2c, #928DAB)', // Matches Home gradient
        boxShadow: '0px 4px 20px rgba(255, 105, 180, 0.3)', // Pinkish shadow from Home button
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)', // Subtle border for depth
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
        {/* Logo/Title */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: 'Poppins, sans-serif', // Matches Home heading font
              fontWeight: 'bold',
              letterSpacing: '2px',
              textShadow: '2px 2px 8px rgba(255, 255, 255, 0.2)', // Matches Home text shadow
              cursor: 'pointer',
            }}
            onClick={() => navigate('/')}
          >
            <span style={{ color: '#FFD700' }}>NeoLearn</span> {/* Gold color from Home */}
          </Typography>
        </motion.div>

        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          {token ? (
            <>
              <Button
                component={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                sx={{
                  color: '#fff',
                  fontFamily: 'Raleway, sans-serif', // Matches Home subtitle font
                  fontWeight: 'bold',
                  px: 3,
                  py: 1,
                  borderRadius: '25px', // Rounded like Home CTA
                  background: 'rgba(255, 255, 255, 0.1)', // Subtle background
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(255, 105, 180, 0.3)', // Pinkish hover like Home
                    boxShadow: '0px 4px 15px rgba(255, 105, 180, 0.4)',
                  },
                }}
                onClick={() => navigate('/dashboard')}
              >
                Dashboard
              </Button>
              {role === 'student' && (
                <Button
                  component={motion.button}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  sx={{
                    color: '#fff',
                    fontFamily: 'Raleway, sans-serif',
                    fontWeight: 'bold',
                    px: 3,
                    py: 1,
                    borderRadius: '25px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(255, 105, 180, 0.3)',
                      boxShadow: '0px 4px 15px rgba(255, 105, 180, 0.4)',
                    },
                  }}
                  onClick={() => navigate('/courses')}
                >
                  Explore Courses
                </Button>
              )}
              <Button
                component={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                sx={{
                  color: '#fff',
                  fontFamily: 'Raleway, sans-serif',
                  fontWeight: 'bold',
                  px: 3,
                  py: 1,
                  borderRadius: '25px',
                  background: 'linear-gradient(45deg, #ff6b6b, #ff9a9e)', // Matches Home CTA gradient
                  boxShadow: '0px 4px 15px rgba(255, 105, 180, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0px 8px 20px rgba(255, 105, 180, 0.5)',
                  },
                }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                component={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                sx={{
                  color: '#fff',
                  fontFamily: 'Raleway, sans-serif',
                  fontWeight: 'bold',
                  px: 3,
                  py: 1,
                  borderRadius: '25px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(255, 105, 180, 0.3)',
                    boxShadow: '0px 4px 15px rgba(255, 105, 180, 0.4)',
                  },
                }}
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
              <Button
                component={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                sx={{
                  color: '#fff',
                  fontFamily: 'Raleway, sans-serif',
                  fontWeight: 'bold',
                  px: 3,
                  py: 1,
                  borderRadius: '25px',
                  background: 'linear-gradient(45deg, #ff6b6b, #ff9a9e)', // Matches Home CTA gradient
                  boxShadow: '0px 4px 15px rgba(255, 105, 180, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0px 8px 20px rgba(255, 105, 180, 0.5)',
                  },
                }}
                onClick={() => navigate('/register')}
              >
                Register 🚀 {/* Rocket emoji from Home CTA */}
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;