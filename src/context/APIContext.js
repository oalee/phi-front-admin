import { useLazyQuery } from "@apollo/client"
import React from "react"
import { GetAllExercises } from "../api/queries"

const APIContext = React.createContext()

function countReducer(state, action) {

    switch (action.type) {

        case 'received': {

            return { ...state, exercises: action.exercises }

        }

        default: {

            throw new Error(`Unhandled action type: ${action.type}`)

        }

    }

}

function APIProvider({ children }) {

    const [getAllExercises, exercises] = useLazyQuery(GetAllExercises)

    const [state, dispatch] = React.useReducer(countReducer, { getAllExercises, exercises: [] })

    console.log(exercises)
    console.log(state)
    if (exercises.data === undefined && exercises.loading === false)
        getAllExercises()

    if (exercises.data != null && state.exercises !== exercises.data.allExercises) {
        console.log('dispatch')
        dispatch({ type: 'received', exercises: exercises.data.allExercises })
    }

    // NOTE: you *might* need to memoize this value

    // Learn more in http://kcd.im/optimize-context

    const value = { state, dispatch }

    return (

        <APIContext.Provider value={value}>

            {children}

        </APIContext.Provider>

    )

}

function useAPIContext() {

    const context = React.useContext(APIContext)

    if (context === undefined) {

        throw new Error('useCount must be used within a CountProvider')

    }

    return context

}

export { APIProvider, useAPIContext }