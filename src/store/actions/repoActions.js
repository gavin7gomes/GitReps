import makeApiRequest from "../../utils/makeApiRequest";
import { backendApi } from "../../utils/misc";
import { SET_PUBLIC_REPOS } from "../types";

export const fetchPublicRepos =
  ({query="0", sortBy="stars", order="desc", page=1}) => async (dispatch, getState) => {

    const {
      auth: { accessToken },
    } = getState();
    
    const response = await makeApiRequest(
      "GET",
      backendApi,
      `search/repositories?q=${query}&sort=${sortBy}&order=${order}&page=${page}`,
      {},
      { Authorization: `token ${accessToken}` }
    );

    if (response.error) {
        window.alert("Something went wrong!!!")
        return;
      }

    dispatch({
        type: SET_PUBLIC_REPOS,
        payload: response.response.items
    })
    return response.response
  };