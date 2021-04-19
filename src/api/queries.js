import { gql } from "@apollo/client";

const LOGIN = gql`
  query Query($loginUsername: String!, $loginPassword: String!) {
    tokenPayload(username: $loginUsername, password: $loginPassword) {
      token
    }
  }
`;

const GetAllExercises = gql`
query Query {
  allExercises {
    createdAt
    updatedAt
    id
    longDescription
    type
    pictures {
      url
      width
      height
      placeHolder
      type
      order
      id
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
        title

      }
      reps {
        enabled
        name
        value
        secondValue
        valueType
        title
      }
      repPerDay {
        enabled
        name
        value
        secondValue
        valueType
        title
      }
      hold {
        enabled
        name
        value
        secondValue
        valueType
        title
      }
      restPerSet {
        enabled
        name
        value
        secondValue
        valueType
        title
      }
      totalDuration {
        enabled
        name
        value
        secondValue
        valueType
        title
      }
    }
    videos {
      url
      width
      height
      placeHolder
      type
      order
      id
    }
    assesments {
      tiredness {
        enabled
        name
        title
      }
      dificulty {
        enabled
        name
        title
      }
      shortnessOfBreath {
        enabled
        name
        title
      }
      pain {
        enabled
        name
        title
      }
    }
  }
 
}

`
const UpdateExercise = gql`
mutation Mutation($updateInput: UpdateInput) {
  updateExercise(updateInput: $updateInput){
    type
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
      id
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
        title
      }
      reps {
        enabled
        name
        value
        secondValue
        valueType
        title
      }
      repPerDay {
        enabled
        name
        value
        secondValue
        valueType
        title
      }
      hold {
        enabled
        name
        value
        secondValue
        valueType
        title
      }
      restPerSet {
        enabled
        name
        value
        secondValue
        valueType
        title
      }
      totalDuration {
        enabled
        name
        value
        secondValue
        valueType
        title
      }
    }
    videos {
      url
      width
      height
      placeHolder
      type
      order
      id
    }
    assesments {
      tiredness {
        enabled
        name
        title
      }
      dificulty {
        enabled
        name
        title
      }
      shortnessOfBreath {
        enabled
        name
        title
      }
      pain {
        enabled
        name
        title
      }
    }
    
  }
}
`

const AddExcercise = gql`
mutation Mutation($addExerciseInput: ExerciseInput) {
  addExercise(exerciseInput: $addExerciseInput){
    type
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
      id
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
        title
      }
      reps {
        enabled
        name
        value
        secondValue
        valueType
        title
      }
      repPerDay {
        enabled
        name
        value
        secondValue
        valueType
        title
      }
      hold {
        enabled
        name
        value
        secondValue
        valueType
        title
      }
      restPerSet {
        enabled
        name
        value
        secondValue
        valueType
        title
      }
      totalDuration {
        enabled
        name
        value
        secondValue
        valueType
        title
      }
    }
    videos {
      url
      width
      height
      placeHolder
      type
      order
      id
    }
    assesments {
      tiredness {
        enabled
        name
        title
      }
      dificulty {
        enabled
        name
        title
      }
      shortnessOfBreath {
        enabled
        name
        title
      }
      pain {
        enabled
        name
        title
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

const CreatePatient = gql`
mutation Mutation($userInput: UserInput) {
  addUser(userInput: $userInput) {
    id
    patient {
      id
      name
      age
      weight
    }
    username
  }
}

`

const CreateTherapySchedule = gql`
mutation AddTherapyScheduleMutation($patientId: ID!, $scheduleInput: TherapyScheduleInput) {
  addTherapySchedule(patientId: $patientId, therapyScheduleInput: $scheduleInput) {
    id
    updatedAt
    createdAt
    startDate
    endDate
    exerciseIds
    days {
      id
      updatedAt
      createdAt
      date
      parameters {
        parameters {
          sets {
            enabled
            name
            value
            secondValue
            valueType
            title
          }
          reps {
            enabled
            name
            value
            secondValue
            valueType
            title
          }
          repPerDay {
            enabled
            name
            value
            secondValue
            valueType
            title
          }
          hold {
            enabled
            name
            value
            secondValue
            valueType
            title
          }
          restPerSet {
            enabled
            name
            value
            secondValue
            valueType
            title
          }
          totalDuration {
            enabled
            name
            value
            secondValue
            valueType
            title
          }
        }
        exerciseId
        tite
        id
      }
    }
  }
}

`


const GetMyPatients = gql`
query Query {
  myPatients {
    username
    id
    patient {
      id
      name
      age
      weight
    }
  }
}


`

export { LOGIN, GETUSERS, GETME, AddExcercise, GetAllExercises, UpdateExercise, CreatePatient, GetMyPatients, CreateTherapySchedule };
