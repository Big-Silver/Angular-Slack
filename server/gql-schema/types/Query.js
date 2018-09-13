const Query = `
  type Query {
    messages(token: String!, from: String): [Message]
    login(email: String!, password: String!): LoginInfo
    register(email: String!, password: String!): LoginInfo
  }
`;

export default Query;
