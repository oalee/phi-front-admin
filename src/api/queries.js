import { gql } from "@apollo/client";

const LOGIN = gql`
  query Query($loginUsername: String!, $loginPassword: String!) {
    tokenPayload(username: $loginUsername, password: $loginPassword) {
      token
    }
  }
`;

const GETME = gql`
  query Query{
    user {
      id
      username
      type
    }
  }
`;

const GETUSERS = gql`
  query Query {
    users {
      id
      username
      createdAt
      updatedAt
    }
  }
`;

export { LOGIN, GETUSERS, GETME };
