import React, { useEffect, useState } from "react";
import User,{ ALL_USERS_QUERY } from '../components/User';
import { useLazyQuery, useQuery } from "@apollo/react-hooks";

import AddCount from "../components/AddCount";
import StyledForm from "../components/StyledForm";
import UserList from "../components/UserList";
import { addCount } from "../store/count/action";
import { addPosts } from "../store/count/action";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { getUsers } from "../store/count/action";
import { initializeApollo } from "../lib/apollo";
import { initializeStore } from "../lib/redux";
import media from "styled-media-query";
import styled from "styled-components";
import tw from "tailwind.macro";
import { wrapper } from "../store/store";

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

const Index = () => {
  // const [status, setStatus] = useState({posts: []});
  //   const dispatch = useDispatch()
  //   dispatch({
  //     type: 'GET_POSTS',
  //  })

  // useEffect(() => {
  //   props.getUsers();
  // }, [props]);

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
      <User/>
      {/* <UserList users={ props.users || []}></UserList> */}
    </div>
  );
};

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  // store.dispatch(serverRenderClock(true))
  //store.dispatch(addCount())
  //store.dispatch(getUsers());
  //const reduxStore = initStore()
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: ALL_USERS_QUERY
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  }

});

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
