import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-expense" element={<AddExpense />} />
          <Route path="/expenses" element={<ExpenseList />} /> */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;