import { connect, useSelector } from "react-redux";

import {NextPage} from 'next';
import { bindActionCreators } from "redux";
import { getUsers } from "../store/count/action";
import { useEffect } from "react";
import { wrapper } from "../store/store";

const About: NextPage = () => {

  //   useEffect(() => {
  //   props.getUsers();
  // }, [props]);
  //getUsers()
  const aa = useSelector(state => state);
  console.log(aa);
  return (
    <ul>
      {aa?.count?.users?.map((post) => (
        <>
        <li>{post.id}</li>
        <li>{post.email}</li>

        </>
      ))}
    </ul>
  )

}

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  // store.dispatch(serverRenderClock(true))
  //store.dispatch(addCount())
  store.dispatch(getUsers());


});

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getUsers: bindActionCreators(getUsers, dispatch),
//   };
// };

// const mapStateToProps = (state) => ({
//   users: state.count.users,
// })


// }
//export default About
export default About;
