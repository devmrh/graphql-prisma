import { gql } from "apollo-boost";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { useApolloClient } from "@apollo/react-hooks";

export const countActionTypes = {
  ADD: "ADD",
  ADD_POST: "ADD_POSTS",
  GET_USERS: "GET_USERS",
};

export const addCount = () => (dispatch) => {
  return dispatch({ type: countActionTypes.ADD });
};

export const addPosts = () => (dispatch) => {
  return dispatch({ type: countActionTypes.ADD_POST });
};

export const getUsers = () => async (dispatch, getState, client) => {
  const User_Query = gql`
    query {
      getUsers {
        id
        email
      }
    }
  `;

  await client.query({ query: User_Query }).then((res) => {
    return dispatch({
      type: countActionTypes.GET_USERS,
      payload: res?.data?.getUsers,
    });
  });
};
