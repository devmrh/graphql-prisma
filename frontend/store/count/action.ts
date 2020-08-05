import { gql } from 'apollo-boost';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { useApolloClient } from '@apollo/react-hooks';


export const countActionTypes = {
  ADD: 'ADD',
  ADD_POST: 'ADD_POSTS',
  GET_POSTS: 'GET_POSTS'
}








export const addCount = () => (dispatch) => {
  return dispatch({ type: countActionTypes.ADD })
}

export const addPosts = () => (dispatch) => {
  return dispatch({ type: countActionTypes.ADD_POST })
}


export const getPosts = () => async (dispatch, getState,  client ) => {
//console.log("JJJJJJJJJJj",client);
const User_Query = gql`
query {
  getUsers {
    id
    email
  }
}

`

//const client = useApolloClient();
await client.query({query: User_Query}).then(res => {
  console.log("BBBBBBBBBBBBBBB",res?.data?.getUsers);
  return dispatch({ type: countActionTypes.GET_POSTS, payload: res?.data?.getUsers})
})

//const {data, error, loading} = useQuery(User_Query)


//   console.log("im data", data);

}


