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
    instructions
    additionalInstructions
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
        id
        enabled
        name
        value
        secondValue
        valueType
        title
     
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

        id
        enabled
        name
        title
    
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
    instructions
    additionalInstructions
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
        id
        enabled
        name
        value
        secondValue
        valueType
        title
      

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
        id
        enabled
        name
        title
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
    instructions
    additionalInstructions
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
        id
        enabled
        name
        value
        secondValue
        valueType
        title
     
      
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
        id
        enabled
        name
        title
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
        questionares {
          id
          title
          questions {
            order
            id
            question
            answerType
            options {
              order
              id
              value
            }
          }
        }
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

const GetSchedule = gql`
query Query($patientId: ID!) {
  getSchedule(patientId: $patientId){
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
      questionareIds
      evaluation {
        id
        exerciseId
        parameters {
          id
          enabled
          name
          value
          secondValue
          valueType
          title
        }
        feedback
        assesments {
          id
          enabled
          name
          title
          value
        }
      }

      parameters {
        parameters{
            id
            enabled
            name
            value
            secondValue
            valueType
            title
          }
    
        
        additionalInstructions
        exerciseId
        id
      }
    }
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
      questionareIds
      parameters {
        parameters {
      
            enabled
            name
            value
            secondValue
            valueType
            title
          }
         
        
        additionalInstructions
        exerciseId
        id
        enabled
      }
    }
  }
}

`

const UpdateTherapySchedule = gql`
mutation UpdateTherapyScheduleMutation($patientId: ID!, $updateInput: UpdateTherapyScheduleInput!) {
  updateTherapySchedule(patientId: $patientId, updateInput: $updateInput) {
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
      questionareIds
      evaluation {
        id
        exerciseId
        parameters {
          id
          enabled
          name
          value
          secondValue
          valueType
          title
        }
        feedback
        assesments {
          id
          enabled
          name
          title
          value
        }
      }

      parameters {
        parameters {
   
            enabled
            name
            value
            secondValue
            valueType
            title
          
         
        }
       
        
        additionalInstructions
        exerciseId
        id
        enabled
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
      schedule {
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
          questionareIds

          evaluation {
            id
            exerciseId
            parameters {
              id
              enabled
              name
              value
              secondValue
              valueType
              title
            }
            feedback
            assesments {
              id
              enabled
              name
              title
              value
            }
          }


          parameters {
            parameters {
                id
                enabled
                name
                value
                secondValue
                valueType
                title
           
            }

      
            additionalInstructions
            exerciseId
            id
            enabled
          }
        }
      }
    }
  }
}


`

export { LOGIN, GETUSERS, GETME, AddExcercise, GetAllExercises, UpdateExercise, CreatePatient, GetMyPatients, CreateTherapySchedule, UpdateTherapySchedule, GetSchedule };
