import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import UserList from "../components/UserList"

const Index = () => {


  const User_Query = gql`
    query {
      getUsers {
        id
        email
      }
    }

  `

    const users= useQuery(User_Query);

  return (
  <div>
      <h1>hello from graph ql frontend</h1>
      <p>a graph ql frontend</p>
        {console.log(users) }
      <UserList users={users?.data?.getUsers || []}></UserList>

  </div>

  )
}


export default Index;