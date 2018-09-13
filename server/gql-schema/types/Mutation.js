const Mutation = `
  type Mutation {
    register(email: String!, password: String!, username: String!): LoginInfo
  }
`;

export default Mutation;
