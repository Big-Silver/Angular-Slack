import Message from './Message';
import User from './User';
import LoginInfo from './LoginInfo';
import Query from './Query';
import Mutation from './Mutation';

const SchemaDefinition = `
  schema {
    query: Query
    mutation: Mutation
  }
`;

export default [
  SchemaDefinition,
  Query,
  Mutation,
  User,
  Message,
  LoginInfo,
];
