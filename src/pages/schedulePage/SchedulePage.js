


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
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { CreatePatient, GetAllExercises, GetMyPatients } from "../../api/queries";
import { Prompt, useLocation } from "react-router";
import { useAPIContext } from "../../context/APIContext";
import StyledButton from "../addEditExcercise/components/StyledButton/StyledButton";
import { PageState } from "../addEditExcercise/Constants";

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import SendIcon from '@material-ui/icons/Send';
import SaveIcon from '@material-ui/icons/Save';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Select from 'react-select'
import { Calendar, DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
// import JalaliUtils from "@date-io/jalaali";
import moment from "moment";
import jMoment from "moment-jalaali";
import JalaliUtils from "@date-io/jalaali";



import format from "date-fns/format";
import isValid from "date-fns/isValid";
import endOfWeek from "date-fns/endOfWeek";
import startOfWeek from "date-fns/startOfWeek";
import { isSameDay, isWithinInterval } from 'date-fns'
import { createStyles } from "@material-ui/styles";
// this guy required only on the docs site to work with dynamic date library
import { withStyles } from "@material-ui/core";
import clsx from "clsx";


import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ParameterView from "../addEditExcercise/components/ParameterView/ParameterView";



jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

export default function SchedulePage(props) {

    var classes = useStyles();

    const { history, location } = { ...props }

    console.log(location)
    const [selectedDate, handleDateChange] = useState(moment());

    var theme = useTheme();
    var patient = { ...location.state.patient.patient, username: location.state.patient.username }

    const [value, setValue] = React.useState(1);
    const [state, setState] = React.useState({ state: PageState.NOT_COMPLETED })
    const apiContext = useAPIContext()

    const exercises = apiContext.state.exercises
    // const [createUser, createUserRes] = useMutation(CreatePatient)

    // const myPatientsRes = useQuery(GetMyPatients)

    // const [myPatients, setMyPatients] = React.useState([])

    const [openDialog, setOpenDialog] = React.useState(false);

    // const location = useLocation()


    // const [getAllExercises, getAllExercisesState] = useLazyQuery(GetAllExercises)

    // const apiContext = useAPIContext()





    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handeAddPatientClick = () => {
        // sendCreatePatientReq()
    }
    const handleUserInput = (e) => {
        const param = e.target.id
        const value = e.target.value
        // userInput[param] = value

        // console.log(userInput)
    }

    const handlePatientInfo = (e) => {
        // const param = e.target.id
        // const value = e.target.value
        // userInput.patient[param] = value

        // if (param === "age" || param === "weight")
        //     try {
        //         userInput.patient[param] = parseInt(value)

        //     } catch (error) {
        //         userInput.patient[param] = value

        //     }
        // console.log(userInput)

    }
    const stateToButtonProps = () => {

        var props = {
            className: classes.buttonSuccess,
            icon: <SendIcon />,
            label: (state.state === PageState.COMPLETED_NOT_SENT) ? t`Submit` : t`Sumbit Edit`,
            disabled: false,
            onClick: () => {
                console.log("clicked, send update")

            }
        }
        switch (state.state) {
            case PageState.NOT_COMPLETED:
                props = {
                    ...props,
                    disabled: true,
                    label: t`Form is incomplete`
                }
                break

            case PageState.COMPLETED_NOT_SENT:
                props = {
                    ...props,
                    onClick: (e) => {
                        console.log("doAddExcercise")
                        // doAddExcercise({
                        //     variables: {
                        //         addExerciseInput: state
                        //     }
                        // })
                        // setState({ ...state, state: PageState.SENDING })
                    }

                }
                break

            case PageState.EDITED:
                props = {
                    ...props,
                    onClick: () => {
                        // updateExercise({
                        //     variables: {
                        //         updateInput: getUpdateDiff(prevExcercise, state)
                        //     }
                        // })
                        // setState({ ...state, state: PageState.SENDING })

                    }
                }
                break

            case PageState.SENDING:
                props = {
                    ...props,
                    icon: <SaveIcon />,
                    label: t`Sending`,
                    disabled: true,
                    loading: true
                }
                break

            case PageState.SENT:
                props = {
                    ...props,
                    className: classes.buttonSuccess,
                    icon: <CheckCircleOutlineIcon />,
                    label: t`Sent`,
                    disabled: false,
                    onClick: () => { history.goBack() }
                }

                break
            default:
                break;
        }

        return props

    }
    const colourOptions = [
        { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
        { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
        { value: 'purple', label: 'Purple', color: '#5243AA' },
        { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
        { value: 'orange', label: 'Orange', color: '#FF8B00' },
        { value: 'yellow', label: 'Yellow', color: '#FFC400' },
        { value: 'green', label: 'Green', color: '#36B37E' },
        { value: 'forest', label: 'Forest', color: '#00875A' },
        { value: 'slate', label: 'Slate', color: '#253858' },
        { value: 'silver', label: 'Silver', color: '#666666' },
    ];

    const exerciseOptions = exercises.map(exercise => { return { value: exercise.title, label: exercise.title } })



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

    const renderWrappedWeekDay = (date, selectedDate, dayInCurrentMonth) => {
        let dateClone = (date).toDate();
        let selectedDateClone = (selectedDate).toDate();

        console.log("date is ", dateClone)

        const start = startOfWeek(selectedDateClone);
        const end = endOfWeek(selectedDateClone);

        const dayIsBetween = isWithinInterval(dateClone, { start, end });
        const isFirstDay = true
        const isSelectedDay = isSameDay(dateClone, selectedDateClone)
        const isLastDay = true

        const wrapperClassName = clsx({
            [classes.highlight]: dayIsBetween,
            [classes.selectedDateHighlight]: isSelectedDay,
            [classes.endHighlight]: isLastDay,
        });

        const dayClassName = clsx(classes.day, {
            [classes.nonCurrentMonthDay]: !dayIsBetween,
            [classes.highlightNonCurrentMonthDay]: !dayInCurrentMonth && dayIsBetween,
        });

        return (
            <div className={wrapperClassName}>
                <IconButton className={dayClassName}>
                    <span style={{
                        fontSize: 18
                    }}> {date.format("jD")} </span>                </IconButton>
            </div>
        );
    };


    const handleParameterEnableSwap = (event) => {
        const name = event.target.name;
        const value = event.target.checked
        // setState({
        //     ...state, parameters: {
        //         ...state.parameters,
        //         [name]: {
        //             ...state.parameters[name],
        //             enabled: value
        //         }
        //     }
        // })

    }

    const handleParameterChange = (event, value, isFirstValueAssign = true) => {
        const name = event.target.name;
        console.log("handlePar", value)
        console.log("handlePar", event.target.name)
        // const isFirstValueAssign = event.target.isFirst
        console.log("handlePar", isFirstValueAssign)

        // if (isFirstValueAssign)
        //     setState({
        //         ...state, parameters: {
        //             ...state.parameters,
        //             [name]: {
        //                 ...state.parameters[name],
        //                 value: parseInt(value)
        //             }
        //         }
        //     })
        // else
        //     setState({
        //         ...state, parameters: {
        //             ...state.parameters,
        //             [name]: {
        //                 ...state.parameters[name],
        //                 secondValue: parseInt(value)
        //             }
        //         }
        //     })

    }

    return (
        <>
            <div style={{
                position: "relative"
            }}>

                {
                    // <Prompt
                    //     when={PageState.SENT !== state.state}
                    //     message={location =>
                    //         t`Are you sure? information change would be lost.`
                    //     }
                    // />
                }

                <div style={{ position: "absolute", display: "flex", justifyContent: "flex-end", width: "90%", flexDirection: "column", alignItems: "end" }}>

                    <StyledButton props={stateToButtonProps(state.state)} />
                    {/* {(state.state === PageState.EDITED || state.state === PageState.SENT) && <StyledButton props={stateToSecondButtonProps(state.state)} />} */}

                </div>

                <div>


                    <PageTitle title={t`Therapy Schedule`} />

                    <div className={classes.mainContainer}>

                        <div style={{ display: "flex", flexWrap: "wrap" }}>

                            <Paper style={{ width: 300, margin: 20, padding: 20 }}>
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
                                <Trans>Exercises</Trans>
                            </Typography>
                            {/* <IconButton color="primary" aria-label="add an exercise" >
                                <AddCircleOutlineIcon style={{ width: 50, height: 50, margin: 8 }} />
                            </IconButton> */}

                        </div>
                        <div style={{ marginTop: 20, padding: 25 }}>

                            <Select
                                defaultValue={[exerciseOptions[2], exerciseOptions[3]]}
                                isMulti
                                name="colors"
                                options={exerciseOptions}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                styles={selectStyle}
                            />
                        </div>


                        <Typography style={{ marginTop: theme.spacing(5) }} variant="h2" >
                            <Trans>Schedule</Trans>
                        </Typography>
                        {/* */}
                        <div style={{ display: "flex", marginTop: 0, flexDirection: "column" }}>


                            <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa"   >
                                <div style={{ display: "flex", marginTop: 40, flexWrap: "wrap" }}>


                                    <Typography style={{ margin: 20 }} variant="h5" >
                                        <Trans>Start Date</Trans> :
                        </Typography>
                                    <DatePicker
                                        okLabel="تأیید"
                                        cancelLabel="لغو"
                                        labelFunc={date => (date ? date.format("jYYYY/jMM/jDD") : "")}
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        style={{ margin: 12 }}
                                    />

                                    <Typography style={{ margin: 20 }} variant="h5" >
                                        <Trans>End Date</Trans> :
                                    </Typography>

                                    <DatePicker
                                        okLabel="تأیید"
                                        cancelLabel="لغو"
                                        labelFunc={date => (date ? date.format("jYYYY/jMM/jDD") : "")}
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        style={{ margin: 12 }}
                                    />

                                </div>

                                <div style={{
                                    marginTop: 10, justifyContent: "start"

                                    // , alignItems: "center"
                                    , display: "flex",
                                    flexWrap: "wrap"
                                }}
                                >
                                    <Typography style={{ margin: 20 }} variant="h5" >
                                        <Trans>Schedule Day</Trans> :
                                    </Typography>

                                    <DatePicker

                                        variant="static"
                                        labelFunc={date => (date ? date.format("jYYYY/jMM/jDD") : "")}
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        renderDay={renderWrappedWeekDay}
                                        fullWidth
                                    />

                                </div>

                                {/* <Calendar date={selectedDate} /> */}
                            </MuiPickersUtilsProvider>

                            <div >
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-label="Expand"
                                        aria-controls="additional-actions1-content"
                                        id="additional-actions1-header"
                                    >
                                        <FormControlLabel
                                            aria-label="Acknowledge"
                                            onClick={(event) => event.stopPropagation()}
                                            onFocus={(event) => event.stopPropagation()}
                                            control={<Checkbox />}
                                            label={exercises[0].title}
                                        />
                                    </AccordionSummary>
                                    <AccordionDetails>

                                        <div className={classes.parametersContainer}>


                                            {

                                                Object.keys(exercises[0].parameters).map(key =>
                                                    <ParameterView parameter={exercises[0].parameters[key]}
                                                        handleParameterChange={handleParameterChange}
                                                        key={exercises[0].parameters[key].name}
                                                        handleParameterEnableSwap={handleParameterEnableSwap}
                                                    />)


                                            }



                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-label="Expand"
                                        aria-controls="additional-actions2-content"
                                        id="additional-actions2-header"
                                    >
                                        <FormControlLabel
                                            aria-label="Acknowledge"
                                            onClick={(event) => event.stopPropagation()}
                                            onFocus={(event) => event.stopPropagation()}
                                            control={<Checkbox />}
                                            label="I acknowledge that I should stop the focus event propagation"
                                        />
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography color="textSecondary">
                                            The focus event of the nested action will propagate up and also focus the accordion
                                            unless you explicitly stop it.
          </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-label="Expand"
                                        aria-controls="additional-actions3-content"
                                        id="additional-actions3-header"
                                    >
                                        <FormControlLabel
                                            aria-label="Acknowledge"
                                            onClick={(event) => event.stopPropagation()}
                                            onFocus={(event) => event.stopPropagation()}
                                            control={<Checkbox />}
                                            label="I acknowledge that I should provide an aria-label on each action that I add"
                                        />
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography color="textSecondary">
                                            If you forget to put an aria-label on the nested action, the label of the action will
                                            also be included in the label of the parent button that controls the accordion
                                            expansion.
          </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </div>

                        </div>
                    </div>
                </div>
            </div >

            <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title"><Trans>Add an Patient</Trans></DialogTitle>
                <DialogContent>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="username"
                        label={t`Username`}
                        type="text"
                        fullWidth
                        onChange={handleUserInput}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="password"
                        label={t`Password`}
                        type="password"
                        onChange={handleUserInput}

                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label={t`Name`}
                        type="text"
                        fullWidth
                        onChange={handlePatientInfo}

                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="age"
                        label={t`Age`}
                        type="number"
                        fullWidth
                        onChange={handlePatientInfo}

                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="weight"
                        label={t`Weight`}
                        type="number"
                        fullWidth
                        onChange={handlePatientInfo}

                    />



                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        <Trans>Cancel</Trans>
                    </Button>
                    <Button onClick={handeAddPatientClick} color="primary">
                        <Trans>Add</Trans>
                    </Button>
                </DialogActions>
            </Dialog>

        </>
    );

}