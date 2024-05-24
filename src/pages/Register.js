import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import { TextField, Button, Box, Typography, MenuItem } from "@mui/material";
import { fetchAllergies } from "../actions/allergiesActions";
import { updateFormData, submitForm } from "../actions/formActions";

const Register = () => {
  const formData = useSelector((state) => state.form.formData);
  const allergies = useSelector((state) => state.allergies.allergies || []);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllergies());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      ...formData,
      allergies: formData.allergies || [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phone: Yup.string().required("Phone number is required"),
      allergies: Yup.array(),
    }),

    onSubmit: (values, { resetForm }) => {
      dispatch(submitForm(values));
      resetForm();
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "allergies") {
      const newAllergies = typeof value === "string" ? value.split(",") : value;
      dispatch(updateFormData({ ...formik.values, [name]: newAllergies }));
      formik.setFieldValue(name, newAllergies);
    } else {
      const updatedValues = { ...formik.values, [name]: value };
      dispatch(updateFormData(updatedValues));
      formik.setFieldValue(name, value);
    }
  };

  return (
    <Box className="flex flex-col items-center p-4 absolute w-[calc(100%-40px)] sm:w-[400px] top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
      <Typography variant="h5" component="h1" gutterBottom>
        Registration
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formik.values.name}
          onChange={handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formik.values.email}
          onChange={handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Phone Number"
          name="phone"
          value={formik.values.phone}
          onChange={handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
          margin="normal"
        />
        <TextField
          select
          fullWidth
          label="Allergies"
          name="allergies"
          value={formik.values.allergies}
          onChange={handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.allergies && Boolean(formik.errors.allergies)}
          helperText={formik.touched.allergies && formik.errors.allergies}
          margin="normal"
          SelectProps={{
            multiple: true,
          }}
        >
          {allergies.map((allergy, index) => (
            <MenuItem key={index} value={allergy}>
              {allergy}
            </MenuItem>
          ))}
        </TextField>
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Register;
