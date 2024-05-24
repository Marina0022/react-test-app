import axios from 'axios';

export const FETCH_ALLERGIES_REQUEST = 'FETCH_ALLERGIES_REQUEST';
export const FETCH_ALLERGIES_SUCCESS = 'FETCH_ALLERGIES_SUCCESS';
export const FETCH_ALLERGIES_FAILURE = 'FETCH_ALLERGIES_FAILURE';

export const fetchAllergies = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_ALLERGIES_REQUEST });
    try {
      const response = await axios.get('http://localhost:3000/allergies');
      dispatch({ type: FETCH_ALLERGIES_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_ALLERGIES_FAILURE, payload: error.message });
    }
  };
};


