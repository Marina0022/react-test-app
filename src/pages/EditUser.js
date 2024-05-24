import React, { useEffect, useState } from "react";
import { TextField, Button, Grid, Autocomplete, Chip } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { fetchUsers, updateUser } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllergies } from "../actions/allergiesActions";

const EditUser = ({ user, allergiesOptions }) => {
  const dispatch = useDispatch();
  const handleSubmit = (endpoint, field, values) => {
    const payload = { [field]: values[field] };
    dispatch(updateUser(endpoint, field, user.id, payload));
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    allergies: Yup.array(),
  });

  const [allergies, setAllergies] = useState(user.allergies || []);

  return (
    <div className="p-4 mb-4 gap-2.5 flex flex-col shadow-none">
      <h3>User ID: {user.id}</h3>

      <Formik
        initialValues={{
          email: user.email || "",
          phone: user.phone || "",
          allergies: user.allergies || [],
        }}
        validationSchema={validationSchema}
      >
        {({
          isSubmitting,
          setFieldValue,
          values,
          setSubmitting,
          validateForm,
        }) => {
          return (
            <Form
              className="flex flex-col sm:gap-2.5 gap-5"
              noValidate
              autoComplete="off"
            >
              <div className="flex flex-col sm:gap-2.5 gap-5">
                <div className="flex items-start gap-2.5 sm:flex-row flex-col">
                  <Field
                    className="w-full sm:w-[300px]"
                    as={TextField}
                    name="email"
                    type="email"
                    label="New Email Address"
                    variant="outlined"
                  />

                  <Button
                    className="w-full sm:w-[300px]"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      validateForm().then((validationErrors) => {
                        if (!validationErrors.email) {
                          handleSubmit(
                            "updateUserEmail",
                            "email",
                            values,
                            setSubmitting
                          );
                        }
                      });
                    }}
                    disabled={isSubmitting}
                  >
                    Update Email
                  </Button>
                </div>

                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-[red] test-xs pb-2.5"
                />
              </div>

              <div className="flex flex-col sm:gap-2.5 gap-5">
                <div className="flex items-start gap-2.5 sm:flex-row flex-col">
                  <Field
                    className="w-full sm:w-[300px]"
                    as={TextField}
                    name="phone"
                    type="text"
                    label="New Phone Number"
                    variant="outlined"
                  />

                  <Button
                    className="w-full sm:w-[300px]"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      validateForm().then((validationErrors) => {
                        if (!validationErrors.phone) {
                          handleSubmit(
                            "updateUserPhone",
                            "phone",
                            values,
                            setSubmitting
                          );
                        }
                      });
                    }}
                    disabled={isSubmitting}
                  >
                    Update Phone Number
                  </Button>
                </div>
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-[red] test-xs pb-2.5"
                />
              </div>

              <div className="flex flex-col sm:gap-2.5 gap-5">
                <div className="flex items-start gap-2.5 sm:flex-row flex-col">
                  <Autocomplete
                    multiple
                    className="w-full sm:w-[300px]"
                    options={allergiesOptions}
                    getOptionLabel={(option) => option}
                    value={allergies}
                    onChange={(_event, newValue) => {
                      setAllergies(newValue);
                      setFieldValue("allergies", newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Update Allergies"
                        variant="outlined"
                        name="allergies"
                      />
                    )}
                    renderTags={(tagValue, getTagProp) =>
                      tagValue.map((item, index) => (
                        <Chip
                          {...getTagProp(index)}
                          key={item + 1}
                          label={item}
                        />
                      ))
                    }
                  />

                  <Button
                    className="w-full sm:w-[300px]"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      validateForm().then((validationErrors) => {
                        if (!validationErrors.allergies) {
                          handleSubmit(
                            "updateUserAllergies",
                            "allergies",
                            values,
                            setSubmitting
                          );
                        }
                      });
                    }}
                    disabled={isSubmitting}
                  >
                    Update Allergies
                  </Button>
                </div>
                <ErrorMessage
                  name="allergies"
                  component="div"
                  className="text-[red] test-xs pb-2.5"
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
const EditUsersPage = () => {
  const allergies = useSelector((state) => state.allergies.allergies || []);
  const { users } = useSelector((users) => users.users);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!allergies.length) {
      dispatch(fetchAllergies());
    }
  }, [dispatch, allergies]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div>
      {users
        .sort((a, b) => b.id - a.id)
        .map((user) => (
          <Grid container spacing={2} key={user.id}>
            <Grid item xs={12}>
              <EditUser user={user} allergiesOptions={allergies} />
            </Grid>
          </Grid>
        ))}
    </div>
  );
};

export default EditUsersPage;
