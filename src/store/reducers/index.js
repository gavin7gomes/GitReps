import { combineReducers } from "redux";
import { enableMapSet } from "immer";
import repoReducer from "./repoReducer";
import authReducer from "./authReducer";

enableMapSet();

global.reduxLog = [];

export default combineReducers({
  repo: repoReducer,
  auth: authReducer
});
