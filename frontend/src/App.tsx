import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Loading from './components/Loading';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store/store';
import { ToastContainer } from 'react-toastify';
import Navbar  from './components/Navbar';
import StudentDashboard from './pages/StudentDashboard';
import InstructorDashboard from './pages/InstructorDashboard';
import Courses from './pages/Courses';

const App: React.FC = () => {
  const { loading } = useSelector((state: RootState) => state.auth);
  return (
    <ThemeProvider theme={theme}>
      <Router>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<RouteBasedDashboard />} />
          <Route path="/courses" element={<Courses />} /> 

          {/* 
          <Route path="/add-expense" element={<AddExpense />} />*/}
        </Routes>
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
      </Router>
    </ThemeProvider>
  );
};

const RouteBasedDashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  return user?.role === 'student' ? <StudentDashboard /> : <InstructorDashboard />;
};

export default App;