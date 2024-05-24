import { combineReducers } from "redux";
import formReducer from "./formReducer";
import allergiesReducer from "./allergiesReducer";
import { userReducer } from "./userReducer";

const rootReducer = combineReducers({
  users: userReducer,
  form: formReducer,
  allergies: allergiesReducer,
});

export default rootReducer;
