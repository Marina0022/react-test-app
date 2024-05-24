const initialState = {
  users: [],
  loading: false,
  error: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_USER_REQUEST":
      return { ...state, loading: true, error: null };
    case "UPDATE_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
        error: null,
      };
    case "UPDATE_USER_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "FETCH_USERS_SUCCESS":
      return { ...state, users: action.payload, loading: false, error: null };
    case "FETCH_USERS_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
