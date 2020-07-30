import React from "react"
import styled from "styled-components"

// this interface defines the shape of the data returned by the jobs query.
export interface IUser {
  id: string;
  email: string;

}

interface IProps {
  users: IUser[];
}

const List = styled.ul``
const ListItem = styled.li`
  margin-bottom: .5rem;
`

const UserList = ({ users }: IProps) => {
  const listItems = users.map((user) => {
    return (
      <ListItem key={user.id}>
        {user.id} by {user.email}
      </ListItem>
    )
  })

  return (
    <List>
      {listItems}
    </List>
  )
}

export default UserList