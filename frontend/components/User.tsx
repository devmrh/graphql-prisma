import { NetworkStatus, gql, useQuery } from '@apollo/client'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setUsers } from "../store/count/action";

// export const ALL_USERS_QUERY = gql`
//   query getUsers {
//     getUsers() {
//       id
//       email

//     }
//   }
// `
export const ALL_USERS_QUERY = gql`
    query {
      getUsers {
        id
        email
      }
    }
  `;


function User({setUsers, users}) {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    ALL_USERS_QUERY
  )

//    console.log(data);
  const { getUsers } = data
  setUsers(getUsers)
  return (
    <section>
      <ul>
        {getUsers.map((user, index) => (
          <li key={user.id}>
            <div>
              <span>{index + 1}. </span>
              <a>{user.email}</a>
                { user.email }
            </div>
          </li>
        ))}
      </ul>


      </section>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUsers: bindActionCreators(setUsers, dispatch),
  };
};

const mapStateToProps = (state) => ({
  users: state.count.users,
})

export default connect(mapStateToProps, mapDispatchToProps)(User);
