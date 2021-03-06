import { shield, allow } from 'graphql-shield';
import { rules } from './rules';

export const permissions = shield({
  Query: {
    me: rules.isAuthenticatedUser,
    getUsers: allow,
    '*': allow
  },
  Mutation: {
    createPost: rules.isAuthenticatedUser
  },
  Subscription: {
    latestPost: rules.isAuthenticatedUser
  }
})