


import React, { useEffect, useState } from "react";
import {
    Grid,
    LinearProgress,
    OutlinedInput,
    MenuItem,
    Button,
    Paper,
    Tabs,
    Tab,
    Card,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    IconButton,
    Accordion,
    AccordionSummary,
    FormControlLabel,
    AccordionDetails,
    Checkbox
} from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { useTheme } from "@material-ui/styles";

import PageTitle from "../../components/PageTitle/PageTitle";
import { Typography } from "../../components/Wrappers/Wrappers";
import useStyles from "./styles";
import { Trans } from "@lingui/macro";
import { Fragment } from "react";
import { t } from '@lingui/macro';
import { CreatePatient, GetAllExercises, GetMyPatients, CreateTherapySchedule, UpdateTherapySchedule } from "../../api/queries";
import { Prompt, useLocation } from "react-router";
import { useAPIContext } from "../../context/APIContext";


import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import SendIcon from '@material-ui/icons/Send';
import SaveIcon from '@material-ui/icons/Save';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Select from 'react-select'
import { Calendar, DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import jMoment from "moment-jalaali";
import JalaliUtils from "@date-io/jalaali";


import clsx from "clsx";
import { PageState } from "../addEditExcercise/Constants";
import { genStateFromAPIRes } from "./utils";
import ExerciseEvaluation from "./components/ExerciseEvaluation";



jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

export default function EvaluationPage(props) {

    var classes = useStyles();

    const { history, location } = { ...props }

    console.log(location)

    let today = jMoment()
    const todayText = today.format("dddd jD jMMMM jYYYY ")

    const apiContext = useAPIContext()

    const exercises = apiContext.state.exercises

    var theme = useTheme();
    var patient = { ...location.state.patient }



    const [state, setState] = React.useState({
        state: PageState.NOT_LOADED,
        schedule: {},
        selectedExercises: [],
        startDate: jMoment(),
        endDate: jMoment().add(1, "d"),
        selectedDate: jMoment()


    })


    const loadStateFromLocation = () => {

        console.log("patient is ", patient)
        if (patient.schedule) {
            console.log("there is schedule")

            if (state.state === PageState.NOT_LOADED) {

                setState({ ...genStateFromAPIRes(patient.schedule, exercises) })

            }

        }
    }
    loadStateFromLocation()



    const selectedDateText = state.selectedDate.format("dddd jD jMMMM jYYYY ")
    const selectedDateKey = state.selectedDate.format("jYYYY/jMM/jDD")
    console.log("day values are ", state.schedule[selectedDateKey])

    let hasEvaluationForSelectedDay = state.schedule[selectedDateKey] != null && state.schedule[selectedDateKey].evaluation != null && state.schedule[selectedDateKey].evaluation.length !== 0

    let evaluationsForSelectedDay = (hasEvaluationForSelectedDay) ? state.schedule[selectedDateKey].evaluation.map((evaluation) => {
        return {
            evaluation: evaluation,
            exercise: exercises.find((exer) => exer.id === evaluation.exerciseId),
            parameters: state.schedule[selectedDateKey].parameters.find((param) => param.exerciseId === evaluation.exerciseId)
        }
    })

        // exercise: state.selectedExercises.find((exer) => exer.id === item.exerciseId)

        : null

    console.log("selected date ", evaluationsForSelectedDay, hasEvaluationForSelectedDay)

    // const stateToSecondButtonProps = () => {
    //     var props = {
    //         className: classes.button,
    //         icon: <RestoreIcon />,
    //         label: t`Restore`,
    //         disabled: false,
    //         onClick: (e) => {
    //             setState({ ...copyState(prevState), selectedDate: state.selectedDate, state: PageState.SENT })
    //         }
    //     }

    //     if (state.state === PageState.SENT)
    //         props = {
    //             ...props, icon: <ArrowBackIcon />, label: t`Back`,
    //             onClick: (e) => {

    //                 history.replace('/app/patients')
    //             }
    //         }

    //     return props
    // }


    // const stateToButtonProps = () => {

    //     var props = {
    //         className: classes.buttonSuccess,
    //         icon: <SendIcon />,
    //         label: (state.state === PageState.COMPLETED_NOT_SENT) ? t`Submit` : t`Sumbit Edit`,
    //         disabled: false,
    //         onClick: () => {
    //             console.log("clicked, send update")

    //         }
    //     }
    //     switch (state.state) {
    //         case PageState.NOT_COMPLETED:
    //             props = {
    //                 ...props,
    //                 disabled: true,
    //                 label: t`Form is incomplete`
    //             }
    //             break

    //         case PageState.COMPLETED_NOT_SENT:
    //             props = {
    //                 ...props,
    //                 onClick: (e) => {
    //                     const dates = Object.keys(state.schedule)

    //                     console.log("doAddScheduless", {
    //                         startDate: state.startDate.format("jYYYY/jMM/jDD"),
    //                         endDate: state.endDate.format("jYYYY/jMM/jDD"),
    //                         exercises: state.selectedExercises.map(exercise => exercise.id),
    //                         days: dates.map(date => {
    //                             console.log("date is", date, state.schedule[date])
    //                             // let val = state.schedule[date]
    //                             return {
    //                                 date: date,
    //                                 parameters: state.schedule[date]
    //                             }
    //                         })
    //                     })


    //                     addSchedule({
    //                         variables: stateToCreateScheduleInput(state, patient)
    //                     })
    //                     // doAddExcercise({
    //                     //     variables: {
    //                     //         addExerciseInput: state
    //                     //     }
    //                     // })
    //                     // setState({ ...state, state: PageState.SENDING })
    //                 }

    //             }
    //             break

    //         case PageState.EDITED:
    //             props = {
    //                 ...props,
    //                 onClick: () => {
    //                     updateSchedule({
    //                         variables: {
    //                             patientId: patient.id,

    //                             updateInput: getUpdateInput(state, prevState)
    //                         }
    //                     })
    //                     setState({ ...state, state: PageState.SENDING })

    //                 }
    //             }
    //             break

    //         case PageState.SENDING:
    //             props = {
    //                 ...props,
    //                 icon: <SaveIcon />,
    //                 label: t`Sending`,
    //                 disabled: true,
    //                 loading: true
    //             }
    //             break

    //         case PageState.SENT:
    //             props = {
    //                 ...props,
    //                 className: classes.buttonSuccess,
    //                 icon: <CheckCircleOutlineIcon />,
    //                 label: t`Sent`,
    //                 disabled: false,
    //                 onClick: () => { history.goBack() }
    //             }

    //             break
    //         default:
    //             break;
    //     }

    //     return props

    // }




    const selectStyle = {
        control: base => ({
            ...base,
            fontSize: 25
        }),
        menu: base => ({
            ...base,

            fontSize: 25
        })
    };


    const renderWrappedWeekDay = (date, _, dayInCurrentMonth, dayComponent) => {

        // let todayClone = today.toDate()

        // let dateClone = (date).toDate();
        // let selectedDateClone = (selectedDate).toDate();
        // console.log("date is ", date)
        // console.log("selected date is ", selectedDate)
        // console.log("today is ", today)
        // console.log("startDay is ", startDate)
        // console.log("endDate is ", endDate)

        // const start = startOfWeek(selectedDateClone);
        // const end = endOfWeek(selectedDateClone);
        const isSameAsStartDate = date.isSame(state.startDate, "day") && state.startDate.isSameOrAfter(today)
        const isStartSameAsToday = state.startDate.isSame(today, "day") && today.isSame(date, "day")

        const isSelectedDay = date.isSame(state.selectedDate, "day")
        // const isSelectedDay = date.isSameDate(selectedDate)
        const isPastGoneDays = date.isBetween(state.startDate, today, "day") //|| (isSameAsStartDate && !today.isSame(date, "day"))

        const dayIsBetween = date.isBetween(state.startDate, state.endDate, "day") || isSelectedDay || isStartSameAsToday || isSameAsStartDate || date.isSame(state.endDate, "day")

        if (dayIsBetween) {
            let formatedDate = date.format("jYYYY/jMM/jDD")

            // if (state.schedule)
        }

        // console.log("isSelectedDay", isSelectedDay)
        // console.log("isSameAsStartDate", isSameAsStartDate)

        // console.log("isPastGoneDays", isPastGoneDays)
        // console.log("dayIsBetween", dayIsBetween)

        // const isLastDay = true
        // const isPastGoneDays = isWithinInterval(dateClone, { startDateClone, todayClone })

        const wrapperClassName = clsx({
            [classes.highlight]: dayIsBetween,
            // [classes.disabledDateHighlight]: isPastGoneDays,
            [classes.selectedDateHighlight]: isSelectedDay,
            // [classes.endHighlight]: isLastDay,
        });

        const dayClassName = clsx(classes.day, {
            [classes.nonCurrentMonthDay]: !dayIsBetween,
            [classes.highlightedDates]: dayIsBetween,
        });

        return (
            <div className={wrapperClassName} onClick={(e) => {
                e.stopPropagation()
                if (dayIsBetween) {

                    setState({ ...state, selectedDate: date })
                }
            }} >
                <IconButton className={dayClassName}>
                    <span style={{
                        fontSize: 18
                    }}> {date.format("jD")} </span>
                </IconButton>
            </div>
        );
    };


    return (
        <>
            <div style={{
                position: "relative",
                marginBottom: 200
            }}>



                <div style={{ position: "absolute", display: "flex", justifyContent: "flex-end", width: "90%", flexDirection: "column", alignItems: "end" }}>

                    {/* <StyledButton props={stateToButtonProps(state.state)} />
                    {(state.state === PageState.EDITED || state.state === PageState.SENT) && <StyledButton props={stateToSecondButtonProps(state.state)} />} */}

                </div>

                <div>


                    <PageTitle title={t`Evaluation`} />

                    <div className={classes.mainContainer}>

                        <div style={{ display: "flex", flexWrap: "wrap" }}>

                            <Paper style={{ width: 300, margin: 20, padding: 20 }} elevation={2}>
                                <Typography style={{ marginTop: 25 }} variant="h5" >
                                    <Trans>Name</Trans> : {patient.name}
                                </Typography>


                                <Typography style={{ marginTop: 25 }} variant="h5" >
                                    <Trans>Username</Trans> : {patient.username}
                                </Typography>


                                <Typography style={{ marginTop: 25 }} variant="h5" >
                                    <Trans>Age</Trans> : {patient.age}
                                </Typography>
                                <Typography style={{ marginTop: 25 }} variant="h5" >
                                    <Trans>Weight</Trans> : {patient.weight}
                                </Typography>
                                <Button size="large" color="primary" style={{ marginTop: 15 }}>
                                    <Trans>Edit Information</Trans>
                                </Button>

                            </Paper>
                            <Paper style={{ width: 300, margin: 20, padding: 20 }}>
                                <Typography style={{ marginTop: 25 }} variant="h5" >
                                    <Trans>Done Assesments</Trans> : 22
                                </Typography>



                                <Typography style={{ marginTop: 25 }} variant="h5" >
                                    <Trans>Unread Assesments</Trans> : 5
                                </Typography>

                                <Typography style={{ marginTop: 25 }} variant="h5" >
                                    <Trans>Sessions Done</Trans> : 5
                                </Typography>

                                <Typography style={{ marginTop: 25 }} variant="h5" >
                                    <Trans>Sessions</Trans> : 5
                                </Typography>

                                <Button size="large" color="primary" style={{ marginTop: 15 }}>
                                    <Trans>Read Assesments</Trans>
                                </Button>

                            </Paper>

                        </div>


                        <div style={{ display: "flex" }}>

                            <Typography style={{ marginTop: 25 }} variant="h2" >
                                <Trans>Select Day</Trans>
                            </Typography>
                            {/* <IconButton color="primary" aria-label="add an exercise" >
                                <AddCircleOutlineIcon style={{ width: 50, height: 50, margin: 8 }} />
                            </IconButton> */}

                        </div>

                        {/* */}
                        <div style={{ display: "flex", marginTop: 0, flexDirection: "column" }}>


                            <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa"   >


                                <div style={{
                                    marginTop: 10, justifyContent: "start"
                                    , marginBottom: 15
                                    // , alignItems: "center"
                                    , display: "flex",
                                    flexWrap: "wrap"
                                }}
                                >


                                    <Paper elevation={3} style={{ margin: 5 }}>
                                        <DatePicker

                                            variant="static"
                                            labelFunc={date => (date ? date.format("jYYYY/jMM/jDD") : "")}
                                            value={state.selectedDate}
                                            onChange={(e) => { }}
                                            renderDay={renderWrappedWeekDay}
                                            // fullWidth
                                            minDate={today}
                                            maxDate={state.endDate}
                                            views="date"
                                        />
                                    </Paper>

                                    <Typography style={{ margin: 20 }} variant="h5" >
                                        <Trans>Today</Trans> :
                                    </Typography>


                                    <Typography style={{ marginTop: 20 }} variant="h5" >
                                        {todayText}
                                    </Typography>


                                </div>

                                {/* <Calendar date={selectedDate} /> */}
                            </MuiPickersUtilsProvider>
                            <div style={{
                                marginTop: 10, justifyContent: "start"
                                , marginBottom: 15
                                // , alignItems: "center"
                                , display: "flex",
                                flexWrap: "wrap"
                            }}
                            >
                                <Typography style={{ margin: 20 }} variant="h5" >
                                    <Trans>Evaluations for day</Trans> :
                                    </Typography>


                                <Typography style={{ marginTop: 20 }} variant="h5" >
                                    {selectedDateText}
                                </Typography>
                            </div>
                            {
                                (!hasEvaluationForSelectedDay)

                                &&
                                <Typography style={{ margin: 20 }} variant="h5" >
                                    <Trans>No Evaluation for this day</Trans>
                                </Typography>

                            }
                            {
                                (hasEvaluationForSelectedDay)

                                &&



                                evaluationsForSelectedDay.map(item => {
                                    return (
                                        <Paper elevation={3}
                                            style={{ margin: 20 }}
                                        >

                                            <ExerciseEvaluation
                                                {...item}
                                            />
                                        </Paper>

                                    )
                                })


                            }


                        </div>
                    </div>
                </div>
            </div >


        </>
    );

}