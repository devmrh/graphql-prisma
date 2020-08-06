import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getUsers } from "../store/count/action";
import { wrapper } from "../store/store";

function About({ users,getUsers }) {

  getUsers()
  return (
    <ul>
      {users.map((post) => (
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

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: bindActionCreators(getUsers, dispatch),
  };
};

const mapStateToProps = (state) => ({
  users: state.count.users,
})


// }
//export default About
export default connect(mapStateToProps, mapDispatchToProps)(About);
