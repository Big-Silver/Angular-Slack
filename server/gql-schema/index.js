import { makeExecutableSchema } from 'graphql-tools';

import types from './types';
import resolvers from './resolvers';

export default makeExecutableSchema({
  typeDefs: types,
  resolvers,
});
