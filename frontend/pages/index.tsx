import React, { useState } from 'react';
import UserList from "../components/UserList";
import { gql } from 'apollo-boost';
import media from 'styled-media-query'
import styled from "styled-components";
import tw from 'tailwind.macro';
import { useQuery } from '@apollo/react-hooks';
import StyledForm  from '../components/StyledForm';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { initializeStore } from '../lib/redux';
import { initializeApollo } from '../lib/apollo';
import { useDispatch } from 'react-redux';

// const HeaderBox = styled.div`
//     ${tw`bg-black text-white`};
//     ${media.lessThan('medium')`
//     `};
// `

import { useSelector, shallowEqual } from 'react-redux'

// const usePosts = () => {
//   return useSelector(
//     (state) => ({
//       posts: state.posts,
//     }),
//     shallowEqual
//   )
// }


const Container = styled.div`
max-width: 1010px;
padding: 26px 20px;
width: 100%;
display: flex;
align-items: center;
margin: 0 auto;
`;

const Index = () => {

  const [status, setStatus] = useState(null);



  //const { posts } = usePosts();

  const User_Query = gql`
  query {
    getUsers {
      id
      email
    }
  }

`
  const users= useQuery(User_Query);
  const dispatch = useDispatch()

  dispatch({
    type: 'ADD_POSTS',
    posts: users?.data?.getUsers
  })

  return (
  <div className="">
      <StyledForm>
      <form>
        <input type="text" placeholder="Full name" />
        <input type="text" placeholder="Email" />
        <input type="text" placeholder="Password" />
        <button>Sign In</button>
      </form>
      </StyledForm>
      <h1>hello from graph ql frontend asdasdasdas</h1>
      <p>a graph ql frontend</p>
      <UserList users={ users?.data?.getUsers || []}></UserList>

  </div>

  )
}

export async function getStaticProps(){

  const reduxStore = initializeStore();
  const { dispatch } = reduxStore

  const apolloClient = initializeApollo()



  // dispatch({
  //   type: 'ADD_POSTS',
  //   posts: status.posts
  // })

  // await apolloClient.query({
  //   query: User_Query,
  // })

  return {
    props: {
      initialReduxState: reduxStore.getState(),
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  }



}




export default Index;