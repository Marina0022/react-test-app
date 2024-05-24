import axios from 'axios';

export const UPDATE_FORM_DATA = "UPDATE_FORM_DATA";
export const RESET_FORM = "RESET_FORM";
export const SUBMIT_FORM_REQUEST = "SUBMIT_FORM_REQUEST";
export const SUBMIT_FORM_SUCCESS = "SUBMIT_FORM_SUCCESS";
export const SUBMIT_FORM_FAILURE = "SUBMIT_FORM_FAILURE";



export const updateFormData = (data) => ({
  type: UPDATE_FORM_DATA,
  payload: data,
});

export const resetForm = () => ({
  type: RESET_FORM,
});

export const submitFormRequest = () => ({
  type: SUBMIT_FORM_REQUEST,
});

export const submitFormSuccess = () => ({
  type: SUBMIT_FORM_SUCCESS,
});

export const submitFormFailure = (error) => ({
  type: SUBMIT_FORM_FAILURE,
  payload: error,
});

export const submitForm = (values) => async (dispatch) => {
  dispatch(submitFormRequest());
  try {
    const response = await axios.post("http://localhost:3000/addUser", values);
    if (response.status === 201 || response.status === 200) {
      dispatch(submitFormSuccess());
      alert("User added successfully!");
      dispatch(resetForm());
    } else {
      throw new Error("Failed to add user");
    }
  } catch (error) {
    dispatch(submitFormFailure(error.message));
    alert("There was an error adding the user!");
  }
};
