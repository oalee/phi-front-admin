
import jMoment from "moment-jalaali";
import { PageState } from "../addEditExcercise/Constants";


function getUpdateInput(state, prevState) {

    let diff = getScheduleDiff(state, prevState)


    console.log("diff is ", diff)
    if (diff.startDate)
        diff.startDate = diff.startDate.format("jYYYY/jMM/jDD")

    if (diff.endDate)
        diff.endDate = diff.endDate.format("jYYYY/jMM/jDD")

    if (diff.selectedExercises)
        diff.exercises = diff.selectedExercises.map(exercise => exercise.id)

    diff.selectedExercises = undefined

    const dates = Object.keys(diff.schedule)

    if (dates.length > 0)
        diff.days = dates.map(date => {
            // let val = state.schedule[date]
            let exerciseParameters = state.schedule[date].map(exerciseParameter => {
                let keys = Object.keys(exerciseParameter.parameters)
                let transformedParams = keys.map(key => exerciseParameter.parameters[key])

                return {
                    ...exerciseParameter,
                    title: undefined,
                    parameters: transformedParams

                }
            })
            return {
                date: date,
                id: state.dateIds[date],
                parameters: exerciseParameters
            }
        })
    diff.schedule = undefined
    diff.id = state.id


    console.log("diff is ", diff)

    return diff


}

function stateToCreateScheduleInput(state, patient) {
    const dates = Object.keys(state.schedule)

    return {
        patientId: patient.id,
        scheduleInput: {
            startDate: state.startDate.format("jYYYY/jMM/jDD"),
            endDate: state.endDate.format("jYYYY/jMM/jDD"),
            exercises: state.selectedExercises.map(exercise => exercise.id),
            days: dates.map(date => {

                let exerciseParameters = state.schedule[date].map(exerciseParameter => {
                    let keys = Object.keys(exerciseParameter.parameters)
                    let transformedParams = keys.map(key => exerciseParameter.parameters[key])

                    return {
                        ...exerciseParameter,
                        title: undefined,
                        parameters: transformedParams

                    }
                })
                // let keys = Object.keys(state.schedule[date].parameters.parameters)
                // let transformedParams = keys.map(key => state.schedule[date].parameters.parameters[key])
                // let val = state.schedule[date]
                return {
                    date: date,
                    parameters: exerciseParameters
                }
            })
        }
    }

}

function getScheduleDiff(state, prevState) {
    var dif = {
        schedule: {}
    }
    if (!prevState.startDate.isSame(state.startDate, "day"))
        dif.startDate = state.startDate


    if (!prevState.endDate.isSame(state.endDate, "day"))
        dif.endDate = state.endDate


    if (prevState.selectedExercises.length !== state.selectedExercises.length)
        dif.selectedExercises = state.selectedExercises
    else {

        for (let i = 0; i < state.selectedExercises.length; i++) {
            const element = state.selectedExercises[i];
            const otherElement = prevState.selectedExercises[i]
            if (element.id !== otherElement.id) {
                dif.selectedExercises = state.selectedExercises
                break;
            }
        }
    }

    const scheduleKeys = Object.keys(state.schedule)
    for (let i = 0; i < scheduleKeys.length; i++) {

        const key = scheduleKeys[i];
        const day = state.schedule[key]


        if (prevState.schedule[key] === undefined) {
            dif.schedule[key] = day
        } else {

            day.forEach(item => {

                let found = prevState.schedule[key].find(val => val.id === item.id)
                // console.log("comparing ", item, found)
                if (found) {

                    // console.log("IN COMPARE, ", item)

                    if (item.enabled !== found.enabled || item.additionalInstructions !== found.additionalInstructions) {
                        //add to the diff
                        if (dif.schedule[key] === undefined)
                            dif.schedule[key] = []
                        dif.schedule[key] = [...dif.schedule[key], { ...item }]
                    } else {
                        //now chek diff between parameters
                        Object.keys(item.parameters).every(paramKey => {

                            if (!isParameterEquals(item.parameters[paramKey], found.parameters[paramKey])) {
                                if (dif.schedule[key] === undefined)
                                    dif.schedule[key] = []
                                dif.schedule[key] = [...dif.schedule[key], { ...item }]
                                return false

                            }
                            return true
                        })


                    }
                } else {
                    // not found, just add it 
                    if (dif.schedule[key] === undefined)
                        dif.schedule[key] = []
                    dif.schedule[key] = [...dif.schedule[key], { ...item }]
                }
            });


        }
    }

    return dif


}


function copyState(state) {

    let copy = { ...state }
    let copySchedule = {}
    Object.keys(copy.schedule).forEach(key => {
        copySchedule[key] = copy.schedule[key].map(item => { return { ...item, parameters: { ...item.parameters } } })
    })
    copy.schedule = copySchedule
    copy.selectedExercises = [...state.selectedExercises]
    // copy.schedule = copy.schedule.map(dayList => {

    //     return dayList.map(item => { return { ...item, parameters: { ...item.parameters } } })
    // })

    return copy
}



function isParameterEquals(first, second) {
    if (first.enabled !== second.enabled)
        return false
    if (first.value !== second.value)
        return false

    if (first.secondValue && first.secondValue !== second.secondValue)
        return false

    return true
}


function isStateEdited(state, prevState) {

    let diff = getScheduleDiff(state, prevState)
    console.log("diff is ", diff)
    let keys = Object.keys(diff)
    console.log(keys.length === 1, Object.keys(diff.schedule).length === 0)
    if (keys.length === 1 && Object.keys(diff.schedule).length === 0)
        // if (diff === { schedule: {} }) {
        return false


    return true
}

function genStateFromAPIRes(schedule, exercises) {


    console.log("api res iz ", schedule)

    let today = jMoment()
    const genSchedule = schedule.days.reduce((acc, day) => {


        acc[day.date] = day.parameters.map(item => {

            let exer = exercises.find(exer => exer.id === item.exerciseId)
            // console.log("item is in gen", item, title)
            return {
                ...item,
                title: exer.title,
                parameters: item.parameters.reduce((accu, param) => { return { ...accu, [param.name]: param } }, {})

            }
        })
        return acc
    }, {})




    const genScheduleDateIds = schedule.days.reduce((acc, day) => {
        acc[day.date] = day.id
        return acc
    }, {})
    const startDate = jMoment(p2e(schedule.startDate), "jYYYY/jMM/jDD")
    const endDate = jMoment(p2e(schedule.endDate), "jYYYY/jMM/jDD")


    var selectedDate = jMoment(startDate)
    if (selectedDate.isBefore(today, "day")) {
        if (today.isSameOrBefore(endDate))
            selectedDate = today
    }

    const selectedExercises = schedule.exerciseIds.map(id => exercises.find(item => item.id === id))
    const genState = {
        state: PageState.SENT,
        selectedExercises: selectedExercises,
        schedule: { ...genSchedule },
        startDate: startDate,
        endDate: endDate,
        selectedDate: selectedDate,
        id: schedule.id,
        dateIds: genScheduleDateIds
    }


    return genState

}
function p2e(s) { return s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)) }


export { getScheduleDiff, isStateEdited, genStateFromAPIRes, copyState, getUpdateInput, stateToCreateScheduleInput }