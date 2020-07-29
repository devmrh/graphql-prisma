const express = require('express');
import { ApolloError, ApolloServer, gql } from 'apollo-server-express';
import { schema } from './schema';
import {createContext} from './utils/helper';

import { applyMiddleware } from 'graphql-middleware';
import { permissions } from './permissions';

// const typeDefs = gql `
//   type Query {
//     hello: String
//   }

// `;

// const resolvers = {
//   Query: {
//     hello: () => 'salam'
//   }
// }

const server = new ApolloServer({
  schema: applyMiddleware(schema, permissions),
  context: createContext,
  tracing: true

})


const app = express();
server.applyMiddleware({ app });



export {app};