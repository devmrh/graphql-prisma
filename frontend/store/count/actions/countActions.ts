import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useApolloClient } from "@apollo/react-hooks";
import { countActionTypes } from './types';
import { client } from "../../../lib/apollo";


export const addCount = () => (dispatch) => {
  return dispatch({ type: countActionTypes.ADD });
};

export const addPosts = () => (dispatch) => {
  return dispatch({ type: countActionTypes.ADD_POST });
};

export const getUsers = () => async (dispatch, getState) => {
  const User_Query = gql`
    query {
      getUsers {
        id
        email
      }
    }
  `;

  await client().query({ query: User_Query }).then((res) => {
    return dispatch({
      type: countActionTypes.GET_USERS,
      payload: res?.data?.getUsers,
    });
  });
};

export const setUsers = (data) => async (dispatch) => {
  return dispatch({ type: countActionTypes.SET_USERS, payload: data });

}

