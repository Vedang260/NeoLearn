import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, LinearProgress } from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';

interface Course {
  id: string;
  course: {
    title: string;
    video_url: string;
  };
  enrollment_date: string;
  status: string;
  progress: number;
}

const CoursePage: React.FC<{}> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const course = (location.state as { course: Course })?.course || {
    id: '',
    course: { title: 'Default Course', video_url: '' },
    enrollment_date: '',
    status: '',
    progress: 0,
  };

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [lastSavedTime, setLastSavedTime] = useState(0);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      video.currentTime = (course.progress / 100) * video.duration || 0;
      setCurrentTime(video.currentTime);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    return () => video.removeEventListener('loadedmetadata', handleLoadedMetadata);
  }, [course.progress]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(video.currentTime);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlay = () => {
    videoRef.current?.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    videoRef.current?.pause();
    setIsPlaying(false);
    saveProgress();
  };

  const handleSeek = (seconds: number) => {
    if (videoRef.current) {
      const newTime = Math.max(0, Math.min(videoRef.current.duration, videoRef.current.currentTime + seconds));
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setCurrentTime(0);
      handlePlay();
    }
  };

  const saveProgress = async () => {
    if (!duration || currentTime === lastSavedTime) return;

    const progress = Math.floor((currentTime / duration) * 100);
    try {
      await axios.post(
        '/api/course/progress',
        { courseId: course.id, progress },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLastSavedTime(currentTime);
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      setIsPlaying(false);
      saveProgress();
    };

    video.addEventListener('ended', handleEnded);
    return () => {
      video.removeEventListener('ended', handleEnded);
      saveProgress();
    };
  }, [currentTime, course.id, token]);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: 'linear-gradient(135deg, #1f1c2c, #928DAB)',
          borderRadius: '15px',
          width: '90%',
          maxWidth: '800px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0px 4px 20px rgba(255, 215, 0, 0.3)',
          position: 'relative',
          padding: 3,
        }}
      >
        <Button
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            color: '#fff',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            minWidth: '40px',
            height: '40px',
            '&:hover': {
              background: 'rgba(255, 105, 180, 0.3)',
            },
          }}
          onClick={() => navigate('/dashboard')}
        >
          <CloseIcon />
        </Button>

        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            fontFamily: 'Poppins, sans-serif',
            color: '#FFD700',
            textShadow: '3px 3px 10px rgba(255, 255, 255, 0.2)',
            mb: 2,
            textAlign: 'center',
          }}
        >
          {course.course.title}
        </Typography>

        <Box sx={{ mb: 3 }}>
          <video
            ref={videoRef}
            src={`http://localhost:8000${course.course.video_url}`}
            style={{
              width: '100%',
              borderRadius: '10px',
              boxShadow: '0px 4px 20px rgba(255, 105, 180, 0.3)',
            }}
            onClick={isPlaying ? handlePause : handlePlay}
          />
          <LinearProgress
            variant="determinate"
            value={(currentTime / duration) * 100 || 0}
            sx={{
              mt: 1,
              height: 8,
              borderRadius: 5,
              backgroundColor: '#ccc',
              '& .MuiLinearProgress-bar': { backgroundColor: '#FFD700' },
            }}
          />
          <Typography sx={{ mt: 1, fontFamily: 'Raleway, sans-serif', textAlign: 'center' }}>
            {Math.floor(currentTime)}s / {Math.floor(duration)}s
          </Typography>

          <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variant="contained"
              sx={{
                background: 'linear-gradient(45deg, #ff6b6b, #ff9a9e)',
                borderRadius: '25px',
                px: 3,
                color: '#fff',
              }}
              onClick={isPlaying ? handlePause : handlePlay}
            >
              {isPlaying ? 'Pause' : 'Play'}
            </Button>
            <Button
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variant="contained"
              sx={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '25px',
                px: 3,
                color: '#fff',
              }}
              onClick={() => handleSeek(-10)}
            >
              -10s
            </Button>
            <Button
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variant="contained"
              sx={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '25px',
                px: 3,
                color: '#fff',
              }}
              onClick={() => handleSeek(10)}
            >
              +10s
            </Button>
            <Button
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variant="contained"
              sx={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '25px',
                px: 3,
                color: '#fff',
              }}
              onClick={handleRestart}
            >
              Restart
            </Button>
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
};

export default CoursePage;