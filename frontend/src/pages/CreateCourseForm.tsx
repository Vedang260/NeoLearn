import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
  Input,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { VideoFile, Description, Person, Title } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/slices/authSlice";
import api from "../services/courses/api";

interface CourseFormProps {
  open: boolean;
  onClose: () => void;
}

const CreateCourseForm: React.FC<CourseFormProps> = ({ open, onClose }) => {
  const dispatch = useDispatch();

  // Validation Schema
  const validationSchema = Yup.object({
    title: Yup.string()
      .max(100, "Title must be 100 characters or less")
      .required("Title is required"),
    instructor_name: Yup.string()
      .max(100, "Instructor name must be 100 characters or less")
      .required("Instructor name is required"),
    description: Yup.string()
      .max(500, "Description must be 500 characters or less")
      .optional(),
    video: Yup.mixed<File>()
      .required("Video file is required")
      .test(
        "fileType",
        "Only video files are allowed",
        (value) => !!value && (value as File).type?.startsWith("video/")
      )
      .test(
        "fileSize",
        "File too large (max 50MB)",
        (value) => !value || (value as File).size <= 50 * 1024 * 1024
      ),
  });

  // Formik Hook
  const formik = useFormik({
    initialValues: {
      title: "",
      instructor_name: "",
      description: "",
      video: null as File | null,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        dispatch(setLoading(true));
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("instructor_name", values.instructor_name);
        if (values.description) formData.append("description", values.description);
        if (values.video) formData.append("video", values.video);
    
        // Debugging that works in all TS configurations
        console.log("Form values:", values);
        if (process.env.NODE_ENV === 'development') {
          // Method that works regardless of TS target
          const entries = formData.entries();
          let entry = entries.next();
          while (!entry.done) {
            const [key, value] = entry.value;
            console.log(`FormData ${key}:`, value);
            entry = entries.next();
          }
        }
    
        const response = await api.post("/courses/create", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
    
        if (response.status === 201) {
          toast.success("Course created successfully!");
          formik.resetForm();
          onClose();
        }
      } catch (error: any) {
        console.error("Course creation failed", error);
        toast.error(
          error.response?.data?.message || "Error creating course"
        );
      } finally {
        dispatch(setLoading(false));
      }
    },
  });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 5,
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0px 8px 20px rgba(0,0,0,0.3)",
          width: "450px",
        },
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <DialogTitle>
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ color: "#FFD700", textAlign: "center" }}
          >
            Create New Course
          </Typography>
        </DialogTitle>

        <DialogContent>
          <Box 
            component="form" 
            onSubmit={formik.handleSubmit} 
            noValidate
            sx={{ mt: 1 }}
          >
            {/* Title Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <TextField
                label="Course Title"
                fullWidth
                margin="normal"
                {...formik.getFieldProps("title")}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Title sx={{ color: "#FFD700" }} />
                    </InputAdornment>
                  ),
                }}
                sx={inputStyles}
                inputProps={{ maxLength: 100 }}
              />
            </motion.div>

            {/* Instructor Name Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <TextField
                label="Instructor Name"
                fullWidth
                margin="normal"
                {...formik.getFieldProps("instructor_name")}
                error={
                  formik.touched.instructor_name &&
                  Boolean(formik.errors.instructor_name)
                }
                helperText={
                  formik.touched.instructor_name && formik.errors.instructor_name
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ color: "#FFD700" }} />
                    </InputAdornment>
                  ),
                }}
                sx={inputStyles}
                inputProps={{ maxLength: 100 }}
              />
            </motion.div>

            {/* Description Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <TextField
                label="Description"
                fullWidth
                margin="normal"
                multiline
                rows={3}
                {...formik.getFieldProps("description")}
                error={
                  formik.touched.description && Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Description sx={{ color: "#FFD700" }} />
                    </InputAdornment>
                  ),
                }}
                sx={inputStyles}
                inputProps={{ maxLength: 500 }}
              />
            </motion.div>

            {/* Video Upload Field - Improved */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <FormControl fullWidth error={formik.touched.video && Boolean(formik.errors.video)}>
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  sx={{
                    mt: 2,
                    py: 1.5,
                    borderColor: formik.touched.video && formik.errors.video 
                      ? "error.main" 
                      : "rgba(255, 255, 255, 0.5)",
                    "&:hover": {
                      borderColor: "#FFD700",
                    },
                  }}
                  startIcon={<VideoFile sx={{ color: "#FFD700" }} />}
                >
                  Upload Video
                  <input
                    type="file"
                    hidden
                    accept="video/*"
                    onChange={(event) => {
                      const file = event.target.files?.[0] || null;
                      formik.setFieldValue("video", file);
                    }}
                  />
                </Button>
                <Typography variant="body2" sx={{ mt: 1, color: "#aaa" }}>
                  {formik.values.video?.name || "No file selected"}
                </Typography>
                {formik.touched.video && formik.errors.video && (
                  <FormHelperText error>
                    {formik.errors.video}
                  </FormHelperText>
                )}
              </FormControl>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={formik.isSubmitting}
                sx={{
                  mt: 3,
                  background: "linear-gradient(45deg, #ff9a9e, #ff6b6b)",
                  color: "#fff",
                  fontWeight: "bold",
                  "&:hover": {
                    background: "linear-gradient(45deg, #ff6b6b, #ff9a9e)",
                    boxShadow: "0px 5px 20px rgba(255, 255, 255, 0.5)",
                  },
                }}
              >
                {formik.isSubmitting ? "Creating..." : "Create Course 🚀"}
              </Button>
            </motion.div>

            {/* Close Button */}
            <Button
              onClick={onClose}
              fullWidth
              sx={{ mt: 2, color: "#FFD700" }}
              disabled={formik.isSubmitting}
            >
              Cancel
            </Button>
          </Box>
        </DialogContent>
      </motion.div>
    </Dialog>
  );
};

// Reusable input styles
const inputStyles = {
  input: { color: "#fff" },
  label: { color: "#ddd", "&.Mui-focused": { color: "#FFD700" } },
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "rgba(255, 255, 255, 0.5)" },
    "&:hover fieldset": { borderColor: "#FFD700" },
    "&.Mui-focused fieldset": { borderColor: "#FFD700" },
  },
};

export default CreateCourseForm;