import React, { useState, useEffect } from "react";
import UserList from "../components/UserList";
import { gql } from "apollo-boost";
import media from "styled-media-query";
import styled from "styled-components";
import tw from "tailwind.macro";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import StyledForm from "../components/StyledForm";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { initializeStore } from "../lib/redux";
import { initializeApollo } from "../lib/apollo";
import { useDispatch } from "react-redux";
import { wrapper, initStore } from "../store/store";
import { addCount } from "../store/count/action";
import { addPosts } from "../store/count/action";
import { getUsers } from "../store/count/action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AddCount from "../components/AddCount";
import { useSelector, shallowEqual } from "react-redux";

// const HeaderBox = styled.div`
//     ${tw`bg-black text-white`};
//     ${media.lessThan('medium')`
//     `};
// `

const Container = styled.div`
  max-width: 1010px;
  padding: 26px 20px;
  width: 100%;
  display: flex;
  align-items: center;
  margin: 0 auto;
`;

const Index = (props) => {
  // const [status, setStatus] = useState({posts: []});
  //   const dispatch = useDispatch()
  //   dispatch({
  //     type: 'GET_POSTS',
  //  })

  useEffect(() => {
    props.getUsers();
  }, [props]);

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
      <UserList users={ props.users || []}></UserList>
    </div>
  );
};

// export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
//   // store.dispatch(serverRenderClock(true))
//   //store.dispatch(addCount())
//   store.dispatch(getUsers());

//   const reduxStore = initStore()
//   const apolloClient = initializeApollo()
//   const { dispatch } = reduxStore


//   const User_Query = gql`
//     query {
//       getUsers {
//         id
//         email
//       }
//     }
//   `;


//   await apolloClient.query({
//     query: User_Query
//   })

//   return {
//     props: {
//       initialApolloState: apolloClient.cache.extract(),
//     },
//     revalidate: 1,
//   }

// });




const mapDispatchToProps = (dispatch) => {
  return {
    addCount: bindActionCreators(addCount, dispatch),
    getUsers: bindActionCreators(getUsers, dispatch),
  };
};

const mapStateToProps = (state) => ({
  users: state.count.users,
})

export default connect(mapStateToProps, mapDispatchToProps)(Index);

//export default Index;
