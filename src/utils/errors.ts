import { AuthenticationError, UserInputError } from 'apollo-server-express';


export const errors = {
  notAuthenticated: new AuthenticationError('pleas login to continue'),
  usersAlreadyExists: new UserInputError('User already exists'),
  invalidUser: new UserInputError('Invalid username or password')
}