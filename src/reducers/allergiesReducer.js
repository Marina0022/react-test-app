import {
  FETCH_ALLERGIES_REQUEST,
  FETCH_ALLERGIES_SUCCESS,
  FETCH_ALLERGIES_FAILURE,
} from "../actions/allergiesActions";

const initialState = {
  loading: false,
  allergies: [],
  error: "",
};

const allergiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALLERGIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ALLERGIES_SUCCESS:
      return {
        loading: false,
        allergies: action.payload,
        error: "",
      };
    case FETCH_ALLERGIES_FAILURE:
      return {
        loading: false,
        allergies: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default allergiesReducer;
