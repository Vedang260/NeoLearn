import React from "react";
import { Container, TextField, Button, Typography, Box, MenuItem, Divider, Paper } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";

const Register: React.FC = () => {
  const navigate = useNavigate();

  // ✅ Validation Schema
  const validationSchema = Yup.object({
    username: Yup.string().min(3, "Username must be at least 3 characters").required("Username is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    role: Yup.string().oneOf(["student", "instructor"], "Invalid role").required("Role is required"),
  });

  // 🎯 Formik Hook
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      role: "student",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await axios.post("http://localhost:8000/auth/register", values);
        navigate("/login");
      } catch (error) {
        console.error("Registration failed", error);
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
        background: "linear-gradient(135deg, #667eea, #764ba2)",
      }}
    >
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
        <Paper
          elevation={6}
          sx={{
            p: 5,
            borderRadius: 3,
            textAlign: "center",
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            color: "#fff",
            width: "400px",
          }}
        >
          {/* Animated Heading */}
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Register for <span style={{ color: "#FFD700" }}>NeoLearn</span>
            </Typography>
          </motion.div>

          {/* Registration Form */}
          <Box component="form" onSubmit={formik.handleSubmit} noValidate>
            {/* Custom TextField Style */}
            {["username", "email", "password"].map((field) => (
              <TextField
                key={field}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                fullWidth
                margin="normal"
                type={field === "password" ? "password" : "text"}
                {...formik.getFieldProps(field)}
                error={formik.touched[field as keyof typeof formik.values] && Boolean(formik.errors[field as keyof typeof formik.values])}
                helperText={formik.touched[field as keyof typeof formik.values] && formik.errors[field as keyof typeof formik.values]}
                sx={{
                  input: { color: "#fff" },
                  label: { color: "#ddd" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "rgba(255, 255, 255, 0.5)" },
                    "&:hover fieldset": { borderColor: "#FFD700" },
                    "&.Mui-focused fieldset": { borderColor: "#FFD700" },
                  },
                }}
              />
            ))}

            {/* Role Dropdown */}
            <TextField
              select
              label="Role"
              fullWidth
              margin="normal"
              {...formik.getFieldProps("role")}
              error={formik.touched.role && Boolean(formik.errors.role)}
              helperText={formik.touched.role && formik.errors.role}
              sx={{
                input: { color: "#fff" },
                label: { color: "#ddd" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "rgba(255, 255, 255, 0.5)" },
                  "&:hover fieldset": { borderColor: "#FFD700" },
                  "&.Mui-focused fieldset": { borderColor: "#FFD700" },
                },
              }}
            >
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="instructor">Instructor</MenuItem>
            </TextField>

            {/* Submit Button with Animation */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.3 }}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 3,
                  background: "linear-gradient(45deg, #ff6b6b, #ff9a9e)",
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  boxShadow: "0px 4px 15px rgba(0,0,0,0.3)",
                  "&:hover": {
                    background: "linear-gradient(45deg, #ff9a9e, #ff6b6b)",
                  },
                }}
              >
                Register 🚀
              </Button>
            </motion.div>
          </Box>

          {/* Divider */}
          <Divider sx={{ my: 3, backgroundColor: "#ddd" }} />

          {/* Already have an account? */}
          <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
            Already have an account?{" "}
            <Typography
              component="span"
              sx={{
                color: "#FFD700",
                fontWeight: 600,
                cursor: "pointer",
              }}
              onClick={() => navigate("/login")}
            >
              Login
            </Typography>
          </Typography>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default Register;
