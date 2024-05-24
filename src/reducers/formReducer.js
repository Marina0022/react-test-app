const initialState = {
  formData: {
    name: "",
    email: "",
    phone: "",
    allergies: "",
  },
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_FORM_DATA":
      return {
        ...state,
        formData: {
          ...state.formData,
          ...action.payload,
        },
      };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
};

export default formReducer;
