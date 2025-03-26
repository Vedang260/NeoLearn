import React from "react";
import { Container, TextField, Button, Typography, Box, MenuItem, Divider, Paper, InputAdornment } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { Email, Lock } from "@mui/icons-material";
import { login } from "../services/auth/api";
import { setCredentials, setLoading } from "../redux/slices/authSlice";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { RootState, store } from "../redux/store/store";

const Register: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state: RootState) => state.auth.loading);

  // ✅ Validation Schema
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  // 🎯 Formik Hook
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await login(values);
        const data: any = response.data;
        console.log("API Response Data:", data); // Check if API returns correct data

  if (data?.success) {
    console.log("Dispatching Token:", data.token); // Log token before dispatching

    dispatch(setCredentials({ token: data.token, user: data.user }));
    
    // Verify token immediately after dispatch
    setTimeout(() => {
      console.log("Stored Token in Redux:", store.getState().auth.token);
      console.log("User: ", store.getState().auth.user);
    }, 100); // Small delay to ensure Redux state is updated

    toast.success(data.message);
    navigate("/dashboard");
  }else{
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Failed to login");
      } finally {
        dispatch(setLoading(false));
      }
    },
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: 'linear-gradient(135deg, #1f1c2c, #928DAB)', // ✅ Same as Home Page
      }}
    >
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
        <Paper
          elevation={10}
          sx={{
            p: 5,
            borderRadius: 5,
            textAlign: "center",
            backdropFilter: "blur(12px)",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            color: "#fff",
            width: "400px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0px 8px 20px rgba(0,0,0,0.3)",
          }}
        >
          {/* Animated Heading */}
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: "#FFD700" }}>
              Welcome Back!, Login
            </Typography>
          </motion.div>

          {/* Registration Form */}
          <Box component="form" onSubmit={formik.handleSubmit} noValidate>
            {/* Custom Styled TextFields */}

            {/* Email Field */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                {...formik.getFieldProps("email")}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: "#FFD700" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  input: { color: "#fff" },
                  label: { color: "#ddd", "&.Mui-focused": { color: "#FFD700" } },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "rgba(255, 255, 255, 0.5)" },
                    "&:hover fieldset": { borderColor: "#FFD700" },
                    "&.Mui-focused fieldset": { borderColor: "#FFD700" },
                  },
                }}
              />
            </motion.div>

            {/* Password Field */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                {...formik.getFieldProps("password")}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: "#FFD700" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  input: { color: "#fff" },
                  label: { color: "#ddd", "&.Mui-focused": { color: "#FFD700" } },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "rgba(255, 255, 255, 0.5)" },
                    "&:hover fieldset": { borderColor: "#FFD700" },
                    "&.Mui-focused fieldset": { borderColor: "#FFD700" },
                  },
                }}
              />
            </motion.div>

            {/* Submit Button with Neon Glow Effect */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.3 }}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 3,
                  background: "linear-gradient(45deg, #ff9a9e, #ff6b6b)",
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  boxShadow: "0px 4px 15px rgba(255, 255, 255, 0.3)",
                  "&:hover": {
                    background: "linear-gradient(45deg, #ff6b6b, #ff9a9e)",
                    boxShadow: "0px 5px 20px rgba(255, 255, 255, 0.5)",
                  },
                }}
              >
                Login 🚀
              </Button>
            </motion.div>
          </Box>

          {/* Divider */}
          <Divider sx={{ my: 3, backgroundColor: "#ddd" }} />

          {/* Already have an account? */}
          <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
            Don't have an account?{" "}
            <Typography
              component="span"
              sx={{
                color: "#FFD700",
                fontWeight: 600,
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
              onClick={() => navigate("/register")}
            >
              Register
            </Typography>
          </Typography>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default Register;