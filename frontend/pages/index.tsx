import React, { useState, useEffect } from 'react';
import UserList from "../components/UserList";
import { gql } from 'apollo-boost';
import media from 'styled-media-query'
import styled from "styled-components";
import tw from 'tailwind.macro';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import StyledForm  from '../components/StyledForm';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { initializeStore } from '../lib/redux';
import { initializeApollo } from '../lib/apollo';
import { useDispatch } from 'react-redux';

import { wrapper } from '../store/store';
import { addCount } from '../store/count/action';
import { addPosts } from '../store/count/action';
import { getPosts } from '../store/count/action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import  AddCount  from '../components/AddCount';

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

const Index = ( props  ) => {
console.log("haaaaaaaaaaaaaaaaaa",props);
 // const [status, setStatus] = useState({posts: []});



  //const { posts } = usePosts();




//   const dispatch = useDispatch()
//   dispatch({
// type: 'GET_POSTS',
// })



  // const users= useQuery(User_Query);
  const dispatch = useDispatch()

  dispatch({
    type: 'GET_POSTS'
  })

  return (
  <div className="">


     <AddCount />
  aaaa<div></div>
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
      {/* <UserList users={ users?.data?.getUsers || []}></UserList> */}

  </div>

  )
}

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
 // store.dispatch(serverRenderClock(true))
  store.dispatch(addCount())
  store.dispatch(getPosts())
})

const mapDispatchToProps = (dispatch) => {
  return {
    addCount: bindActionCreators(addCount, dispatch),
    getPosts: bindActionCreators(getPosts, dispatch),
  }
}

const mapStateToProps = (state) => ({
  posts: state.count.posts,
})


export default connect(mapStateToProps, mapDispatchToProps)(Index)



//export default Index;