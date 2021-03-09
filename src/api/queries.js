import { gql } from "@apollo/client";

const LOGIN = gql`
  query Query($loginUsername: String!, $loginPassword: String!) {
    tokenPayload(username: $loginUsername, password: $loginPassword) {
      token
    }
  }
`;

const AddExcercise = gql`
mutation Mutation($addexerciseExcerciseInput: ExcerciseInput) {
  addexercise(excerciseInput: $addexerciseExcerciseInput){
    createdAt
    updatedAt
    id
    longDescription
    pictures {
      url
      width
      height
      placeHolder
      type
      order
    }
    shortDescription
    title
    parameters {
      sets {
        enabled
        name
        value
        secondValue
        valueType
      }
      reps {
        enabled
        name
        value
        secondValue
        valueType
      }
      repPerDay {
        enabled
        name
        value
        secondValue
        valueType
      }
      hold {
        enabled
        name
        value
        secondValue
        valueType
      }
      restPerSet {
        enabled
        name
        value
        secondValue
        valueType
      }
      totalDUration {
        enabled
        name
        value
        secondValue
        valueType
      }
    }
    videos {
      url
      width
      height
      placeHolder
      type
      order
    }
    assesments {
      tiredness {
        enabled
        name
      }
      dificulty {
        enabled
        name
      }
      shortnessOfBreath {
        enabled
        name
      }
      pain {
        enabled
        name
      }
    }
    
  }
}
`


const GETME = gql`
  query Query{
    user {
      id
      username
      type
      therapist {
        name
      }
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

export { LOGIN, GETUSERS, GETME, AddExcercise };
