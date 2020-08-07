import { connect, useSelector } from "react-redux";

import { NextPage } from "next";
import { bindActionCreators } from "redux";
import { getUsers } from "../store/count/action";
import { useEffect } from "react";
import { wrapper } from "../store/store";
import { client } from "../lib/apollo";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const About: NextPage = ({pageProps, getStaticProp}) => {
  useEffect(() => {
    //getUsers();
  }, []);
  // getUsers()
 // const aa = useSelector((state) => state);
   //console.log("IM AA", aa);
   const {app,users, page} = useSelector(state => state);

  // console.log("im props", props);
  return (
    <ul>
      {users?.map((post) => (
        <>
          <li>{post.id}</li>
          <li>{post.email}</li>
        </>
      ))}
    </ul>
  );
};

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {


  const User_Query = gql`
  query {
    getUsers {
      id
      email
    }
  }
`;

await client().query({ query: User_Query }).then((res) => {

  store.dispatch({type: 'GET_USERS', payload: res?.data?.getUsers});
});


  return {props: {getStaticProp: 'bar'}};

  // store.dispatch(serverRenderClock(true))
  //store.dispatch(addCount())
//   await store.dispatch(getUsers());

//   const data = await store.getState();

//   return {
//     props: {
//       users: data.count.users,
//     },
//     revalidate: 1,
//   };
});

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getUsers: bindActionCreators(getUsers, dispatch),
//   };
// };

// const mapStateToProps = (state) => ({
//   users: state.count.users,
// })


//export default About
//export default About;
export default connect(null, null)(About);
