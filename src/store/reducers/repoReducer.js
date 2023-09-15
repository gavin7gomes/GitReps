import { produce } from "immer";
import { SET_PUBLIC_REPOS } from "../types";

const initialState = {
    publicRepos: []
  };
  
const repoReducer = produce((state, action) => {
    switch (action.type) {
      case SET_PUBLIC_REPOS: {
        return {
          ...state,
          publicRepos: action.payload
        };
      }
      default: {
        return state;
      }
    }
  }, initialState);

export default repoReducer;

  