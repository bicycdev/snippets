import { combineReducers } from "redux";
import snippets from "./snippets";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";


export default combineReducers({
  snippets,
  errors,
  messages,
  auth,
});
