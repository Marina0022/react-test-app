import axios from "axios";

export const updateUserRequest = () => ({
  type: "UPDATE_USER_REQUEST",
});

export const updateUserSuccess = (user) => ({
  type: "UPDATE_USER_SUCCESS",
  payload: user,
});

export const updateUserFailure = (error) => ({
  type: "UPDATE_USER_FAILURE",
  payload: error,
});

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      dispatch({ type: "FETCH_USERS_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "FETCH_USERS_FAILURE", payload: error });
    }
  };
};

export const updateUser = (endpoint, field, userId, values) => {
  return async (dispatch) => {
    dispatch(updateUserRequest());
    try {
      const payload = { [field]: values[field] };
      const response = await axios.put(
        `http://localhost:3000/${endpoint}/${userId}`,
        payload
      );

      let verifyEndpoint = "";
      if (field === "email") {
        verifyEndpoint = "verifyAndUpdateEmail";
      } else if (field === "phone") {
        verifyEndpoint = "verifyAndUpdatePhone";
      }

      if (verifyEndpoint) {
        const verifyResponse = await axios.put(
          `http://localhost:3000/${verifyEndpoint}/${userId}`,
          {
            verificationCode: response.data.verificationCode,
            [field]: values[field],
          }
        );

        dispatch(updateUserSuccess(verifyResponse.data));
      } else {
        dispatch(updateUserSuccess(response.data));
      }
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };
};
