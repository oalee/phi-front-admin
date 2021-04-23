import { useLazyQuery } from "@apollo/client"
import React from "react"
import { GetAllExercises, GetMyPatients } from "../api/queries"
import { useUserDispatch } from "./UserContext"

const APIContext = React.createContext()

function reducer(state, action) {

    console.log("do reducer ", action)
    switch (action.type) {

        case 'recievedPatients': {
            return {
                ...state,
                patients: action.patients
            }
        }

        case 'addSchedule': {

            console.log("addSchedule with action ", action)
            return {
                ...state,
                patients: state.patients.map(patient => {
                    if (action.patient.id === patient.patient.id) {
                        // patient.patient.schedule = { ...action.schedule }
                        console.log("patienttt", patient)
                        console.log("patienttt", patient.patinet)
                        let newPatient = { ...patient, patient: { ...patient.patient, schedule: action.schedule } }
                        console.log("new val should be ", newPatient)
                        return newPatient
                    }
                    return patient
                })
            }

        }

        case 'received': {

            return { ...state, exercises: action.exercises }

        }

        case 'added': {
            console.log("added one is ", action.exercise)
            return { ...state, exercises: [...state.exercises, action.exercise] }
        }

        case 'updated': {

            return {
                ...state, exercises: state.exercises.map(item => {

                    if (item.id === action.exercise.id)
                        return action.exercise
                    return item

                })
            }
        }

        default: {

            throw new Error(`Unhandled action type: ${action.type}`)

        }

    }

}

function APIProvider({ children }) {

    const [getAllExercises, exercises] = useLazyQuery(GetAllExercises)
    const [getMyPatients, patientsRes] = useLazyQuery(GetMyPatients)

    const [state, dispatch] = React.useReducer(reducer, { getAllExercises, exercises: [], patients: [] })

    const userContext = useUserDispatch()

    // console.log(exercises)
    console.log("state In provider is ", state)
    console.log("res iz ", patientsRes)

    if (userContext) {
        console.log("userContex is in API Provider ", userContext)
        if (userContext.type === "Therapist") {
            console.log("type is okay")
            if (!patientsRes.loading && patientsRes.data === undefined) {
                console.log("getMyPatients in Provider")
                getMyPatients()
            }
        }
    }

    if (patientsRes.data != null && state.patients.length === 0) {
        console.log("res iz ", patientsRes)
        dispatch({ type: 'recievedPatients', patients: patientsRes.data.myPatients })
    }

    if (exercises.data === undefined && exercises.loading === false)
        getAllExercises()

    if (exercises.data != null && state.exercises.length === 0) {
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