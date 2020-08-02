import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import UserList from "../components/UserList"
import styled from "styled-components"
import tw from 'tailwind.macro'
import media from 'styled-media-query'

// const HeaderBox = styled.div`
//     ${tw`bg-black text-white`};
//     ${media.lessThan('medium')`
//     `};
// `

const StyledForm = styled.main.attrs({
  className: "flex flex-col h-screen justify-center items-center bg-gray-100",
})`
  & {
    form {
      ${tw`bg-white text-center rounded py-8 px-5 shadow max-w-xs`}
    }
    input {
      ${tw`border-gray-300 mb-4 w-full border-solid border rounded py-2 px-4`}
    }
    button {
      ${tw`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-blue-700 rounded`}
    }
  }
`


const Container = styled.div`
  max-width: 1010px;
  padding: 26px 20px;
  width: 100%;
  display: flex;
  align-items: center;
  margin: 0 auto;
`;

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
  <div className="">
      <StyledForm>
      <form>
        <input type="text" placeholder="Full name" />
        <input type="text" placeholder="Email" />
        <input type="text" placeholder="Password" />
        <button>Sign In</button>
      </form>
      </StyledForm>
      <h1>hello from graph ql frontend</h1>
      <p>a graph ql frontend</p>
      <UserList users={users?.data?.getUsers || []}></UserList>

  </div>

  )
}


export default Index;