import { isEqualType } from "graphql";


function objectEquals(x, y) {
    // 'use strict';

    if (x === null || x === undefined || y === null || y === undefined) { return x === y; }
    // after this just checking type of one would be enough
    if (x.constructor !== y.constructor) { return false; }
    // if they are functions, they should exactly refer to same one (because of closures)
    if (x instanceof Function) { return x === y; }
    // if they are regexps, they should exactly refer to same one (it is hard to better equality check on current ES)
    if (x instanceof RegExp) { return x === y; }
    if (x === y || x.valueOf() === y.valueOf()) { return true; }
    if (Array.isArray(x) && x.length !== y.length) { return false; }

    // if they are dates, they must had equal valueOf
    if (x instanceof Date) { return false; }

    // if they are strictly equal, they both need to be object at least
    if (!(x instanceof Object)) { return false; }
    if (!(y instanceof Object)) { return false; }

    // recursive object equality check
    var p = Object.keys(x);
    return Object.keys(y).every(function (i) { return p.indexOf(i) !== -1; }) &&
        p.every(function (i) { return objectEquals(x[i], y[i]); });
}



function isExerciseEdited(state, prevExcercise) {

    if (prevExcercise === null || prevExcercise === undefined)
        return true

    var updateDiff = getUpdateDiff(prevExcercise, state)
    var temp = { id: state.id }
    if (objectEquals(temp, updateDiff)) {
        return false
    }

    return true

}

function exerciseToState(exercise) {

    console.log("exerciseToState ", exercise)
    let params = exercise.parameters.reduce((acc, item) => {
        return {
            ...acc,
            [item.name]: item
        }
    }, {})

    console.log("param will be ", params)

    let assessment = exercise.assesments.reduce((acc, item) => {
        return {
            ...acc,
            [item.name]: item
        }
    }, {})


    return {
        ...exercise,
        parameters: params,
        assesments: assessment

    }
}

function getUpdateQuery(prevExercise, state) {

    let diff = getUpdateDiff(prevExercise, state)
    if (diff.assesments) {
        let assesKeys = Object.keys(state.assesments)
        diff.assesments = assesKeys.map(item => state.assesments[item])
    }
    if (diff.parameters) {
        let assesKeys = Object.keys(state.parameters)
        diff.parameters = assesKeys.map(item => state.parameters[item])
    }

    return diff
}

function stateToExerciseInput(state) {
    let paramKeys = Object.keys(state.parameters)
    let assesKeys = Object.keys(state.assesments)

    return {
        ...state,
        instructions: state.longDescription,
        parameters: paramKeys.map(item => state.parameters[item]),
        assesments: assesKeys.map(item => state.assesments[item])
    }
}

function getUpdateDiff(prevExcercise, state) {

    var diff = { id: state.id }
    if (prevExcercise.title !== state.title) {
        diff.title = state.title
    }

    if (prevExcercise.pictures.length !== state.pictures.length) {
        diff.pictures = state.pictures
    } else {
        for (var i = 0; i < prevExcercise.pictures.length; i++) {
            if (prevExcercise.pictures[i].url !== state.pictures[i].url) {
                diff.pictures = state.pictures

                break
            }
        }
    }
    if (prevExcercise.type !== state.type) {
        diff.type = state.type
    }
    if (prevExcercise.shortDescription !== state.shortDescription) {
        diff.shortDescription = state.shortDescription
    }
    if (prevExcercise.longDescription !== state.longDescription) {
        diff.longDescription = state.longDescription
    }
    if (prevExcercise.videos.length !== state.videos.length) {
        diff.videos = state.videos
    } else {
        for (i = 0; i < prevExcercise.videos.length; i++) {
            if (prevExcercise.videos[i].url !== state.videos[i].url) {
                diff.videos = state.videos

                break
            }
        }
    }

    if (prevExcercise.videos.length !== state.videos.length) {
        diff.videos = state.videos
    }

    Object.keys(prevExcercise.assesments).forEach(key => {

        if (!isAssesmetEquals(prevExcercise.assesments[key], state.assesments[key])) {
            diff.assesments = state.assesments
        }
    })


    Object.keys(prevExcercise.parameters).forEach(key => {

        if (!isParameterEquals(prevExcercise.parameters[key], state.parameters[key])) {
            diff.parameters = state.parameters
        }
    })

    console.log('diff is ', diff)

    return diff
}

function isAssesmetEquals(first, second) {
    return first.enabled === second.enabled
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

export { isExerciseEdited, getUpdateDiff, exerciseToState, stateToExerciseInput, getUpdateQuery }